from owlready2 import *


class Ontology:
    def __init__(self, path):
        self._onto = get_ontology(path).load()

    def verify(self, person, prediction):
        p_ref = self._add_person(person, prediction)

        error = self._run_reasoner()

        error_explanation = self._parse_error(error) if error is not None else None

        self._remove_person(p_ref)

        return not error, error_explanation

    def _add_person(self, person, prediction):
        p_ref = self._onto.Person()

        if person['Age'] is not None:
            p_ref.hasAge = self._onto.Child if person['Age'] <= 18 else self._onto.Adult

        if person['Sex'] is not None:
            p_ref.hasGender = self._onto.Male if person['Sex'] == 'male' else self._onto.Female

        if person['Pclass'] is not None:
            p_ref.hasClass = self._map_class(person['Pclass'])

        p_ref.hasSurvived = self._onto.Survived if prediction else self._onto.Died

        return p_ref

    def _map_class(self, class_info):
        if class_info == 1:
            return self._onto.Class1
        elif class_info == 2:
            return self._onto.Class2
        elif class_info == 3:
            return self._onto.Class3
        else:
            return None

    def _remove_person(self, person):
        destroy_entity(person)

    def _run_reasoner(self):
        reasoner_error = None

        try:
            sync_reasoner_pellet(infer_property_values=True, infer_data_property_values=True, debug=2)
        except OwlReadyInconsistentOntologyError as error:
            reasoner_error = error

        return reasoner_error

    def _parse_error(self, error):
        error_message = str(error)
        explanation_section = error_message[error_message.index('Explanation'):error_message.index('\n\n\n')]
        lines = explanation_section.split('\n')[1:]
        return [l.strip() for l in lines if l.__contains__('Rule')]
