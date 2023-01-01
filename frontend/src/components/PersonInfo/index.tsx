import React, { useEffect, useState } from 'react';

import fetch from '../../util/fetch';
import { PassengerId, PersonInfoResponse } from '../../types/api.types';
import PersonInfoView from './PersonInfoView';

type PersonInfoProps = {
  id: PassengerId,
};

export default function PersonInfo({ id }: PersonInfoProps) {
  const [personData, setPersonData] = useState<PersonInfoResponse | null>(null);

  useEffect(() => {
    setPersonData(null);
    fetch<PersonInfoResponse>('get', `api/entities/${id}`).then((data) => {
      setPersonData(data);
    });
  }, [id]);

  if (!personData) {
    return <div>Loading...</div>;
  }

  return (
    <PersonInfoView person={personData} />
  );
}
