import React, { MouseEventHandler, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { PersonData, PersonRaw } from '../../../types/api.types';

type DashboardViewProps = {
  people: PersonData[],
  onSelectPerson: (person: PersonRaw) => void,
};

const columns: (onSelect: (person: PersonRaw) => void) => GridColDef[] = (onSelect) => ([
  { field: 'PassengerId', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 150 },
  { field: 'Sex', headerName: 'Sex', width: 70 },
  { field: 'Cabin', headerName: 'Cabin', width: 70 },
  { field: 'Age', headerName: 'Age', width: 70 },
  { field: 'IsChild', headerName: 'Age group', width: 70 },
  { field: 'Embarked', headerName: 'Embarked', width: 70 },
  { field: 'Fare', headerName: 'Fare', width: 70 },
  { field: 'Pclass', headerName: 'Pclass', width: 70 },
  { field: 'Ticket', headerName: 'Ticket', width: 70 },
  { field: 'Survival', headerName: 'Survived', width: 70 },
  { field: 'Covered', headerName: 'Covered', width: 70 },
    {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    renderCell: (params) => {
      const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        onSelect(params.row);
      };

      return <Button onClick={onClick}>Display</Button>;
    },
  },
]);

const extractPerson: (data: PersonData) => PersonRaw = R.prop('raw');
const isCovered: (data: PersonRaw) => boolean = R.propEq('Covered', true);

const getOnlyCovered: (data: PersonData[]) => PersonRaw[] = R.pipe(
  R.map(extractPerson),
  R.filter(isCovered),
);

const getAll: (data: PersonData[]) => PersonRaw[] = R.map(extractPerson);

export default function DashboardView({ people, onSelectPerson }: DashboardViewProps) {
  const [onlyCovered, setOnlyCovered] = useState<boolean>(true);

  const onChangeOnlyCovered = useCallback((_event: SyntheticEvent, checked: boolean) => {
    setOnlyCovered(checked);
  }, []);

  const filteredData = useMemo(() => (
    onlyCovered ? getOnlyCovered(people) : getAll(people)
  ), [people, onlyCovered]);

  const mappedData = useMemo(() => (
    filteredData.map((p: PersonRaw) => ({
      ...p,
      id: p.PassengerId,
      AgeGroup: p.Child ? 'Child' : 'Adult',
      Survival: p.Survived ? 'Survived' : 'Deceased',
      Covered: p.Covered ? 'Covered' : 'Not covered',
    }))
  ), [filteredData]);

  const columnsData = useMemo(() => columns(onSelectPerson), [onSelectPerson]);

  return (
    <div>
      <div>
        <FormControlLabel checked={onlyCovered} onChange={onChangeOnlyCovered} control={<Switch />} label='Show only covered by rules' />
      </div>
      <div style={{ height: 640 }}>
        <DataGrid columns={columnsData} rows={mappedData} pageSize={10} />
      </div>
    </div>
  );
}
