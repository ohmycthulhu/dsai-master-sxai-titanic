import React from 'react';

import { PersonInfoResponse } from '../../../../types/api.types';

type PersonInfoViewProps = {
  person: PersonInfoResponse,
};

export default function PredictionInfo({ person }: PersonInfoViewProps) {
  const predictionAvailable = person.prediction_correct !== null;

  const errors = person.inconsistencies || [];

  if (!predictionAvailable) {
    return <span>Prediction validation is not available.</span>;
  }

  if (person.prediction_correct) {
    return <span className='success'>Prediction is consistent.</span>;
  }

  return (
    <div>
      <span className='danger'>Prediction is inconsistent with ontology</span>:
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
