import React, { useCallback, useMemo } from 'react';
import * as R from 'ramda';

import { PersonInfoResponse, Survival } from '../../../types/api.types';
import './index.css';
import PredictionInfo from './PredictionInfo';

type PersonInfoViewProps = {
  person: PersonInfoResponse,
};

const displayableFields = R.pipe(
  R.pick(['Name', 'Age', 'Sex', 'Pclass', 'Cabin', 'Child', 'Covered', 'Embarked', 'Fare']),
  R.toPairs,
);

export default function PersonInfoView({ person }: PersonInfoViewProps) {
  const formatSurvival = (state: Survival) => (
    state ? 'Survived' : 'Deceased'
  );

  const fields = useMemo(() => displayableFields(person.row.raw), [person]);
  const formatValue = useCallback((value: number | boolean | string | null) => (
    // eslint-disable-next-line no-nested-ternary
    value === true ? 'Yes' : value === false ? 'No' : value === null ? 'Not present' : value
  ), []);

  return (
    <div className='person-info-view-container'>
      <h3>Selected person - {person.row.raw.PassengerId}</h3>
      <div>
        <p>
          Prediction: {formatSurvival(person.prediction)}{' '}
          (actual {formatSurvival(person.row.raw.Survived)})
        </p>
      </div>
      <div className='person-info-view-prediction'>
        <PredictionInfo person={person} />
      </div>
      <ul>
        {fields.map(([field, value]) => (
          <li key={field}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */ ''}
            {field}: {formatValue(value)}
          </li>
))}
      </ul>
    </div>
  );
}
