from app import server
from app.classification import Classificator
from app.ontology import Ontology
from app.cache import cache
from flask import render_template, jsonify
import json


with open('passengers.json') as file:
    data = json.load(file)


classificator = Classificator('model.joblib')
ontology = Ontology('ontology.owl')


@server.route('/')
@server.route('/index')
def index():
    return render_template('index.html')


@server.route('/api/entities')
def entities():
    return jsonify({'data': data})


@server.route('/api/entities/<entity_id>')
@cache.cached(timeout=500)
def entity_info(entity_id):
    entity_id = int(entity_id)
    row = find_row(entity_id)
    prediction = get_class(row)

    if row['raw']['Covered']:
        prediction_correct, inconsistencies = ontology.verify(row['raw'], prediction)
    else:
        prediction_correct, inconsistencies = None, []

    return jsonify({
        'id': entity_id,
        'row': row,
        'prediction': prediction,
        'prediction_correct': prediction_correct,
        'inconsistencies': inconsistencies,
    })


@server.route('/api/statistics')
@cache.cached(timeout=500)
def statistics():
    predictions = [get_class(row) for row in data]
    actual_data = [row['raw']['Survived'] for row in data]

    return jsonify({
      'rule_coverage': sum([bool(row['raw']['Covered']) for row in data]) / len(data),
      'accuracy': sum([p == a for p, a in zip(predictions, actual_data)]) / len(actual_data),
      'false_negative': get_ratio(actual_data, predictions, class_=0),
      'false_positive': get_ratio(actual_data, predictions, class_=1),
    })


def get_ratio(actual, predictions, class_):
    return (
        sum([p == class_ and a != class_ for p, a in zip(actual, predictions)])
        / max(sum([p == class_ for p in predictions]), 1)
    )


def find_row(entity_id):
    for row in data:
        if row['raw']['PassengerId'] == entity_id:
            return row
    return None


def get_class(row):
    if row is None:
        return None

    return int(classificator.predict(row['processed']))
