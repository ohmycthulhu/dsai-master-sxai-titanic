import React, { useEffect, useState } from 'react';

import fetch from '../../util/fetch';
import { PersonRaw, PersonsListResponse } from '../../types/api.types';
import DashboardView from './DashboardView';

type DashboardProps = {
  onSelectPerson: (id: PersonRaw) => void;
};

export default function Dashboard({ onSelectPerson }: DashboardProps) {
  const [peopleData, setPeopleData] = useState<PersonsListResponse | null>(null);

  useEffect(() => {
    fetch<PersonsListResponse>('get', 'api/entities').then((data) => {
      setPeopleData(data);
    });
  }, []);

  if (!peopleData) {
    return <div>Loading passengers info...</div>;
  }

  return (
    <DashboardView people={peopleData.data} onSelectPerson={onSelectPerson} />
  );
}
