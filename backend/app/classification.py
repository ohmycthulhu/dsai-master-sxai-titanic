import joblib
import pandas as pd


class Classificator:
    def __init__(self, path):
        self._model = joblib.load(path)

    def predict(self, row):
        processed = self._transform(row)
        return self._model.predict(processed)[0]

    @staticmethod
    def _transform(row):
        return pd.DataFrame({key: [value] for key, value in row.items()})

