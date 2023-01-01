import React, { useCallback, useState } from 'react';

// Local imports
import Dashboard from '../../components/Dashboard';
import Statistics from '../../components/Statistics';
import PersonInfo from '../../components/PersonInfo';
import { PassengerId, PersonRaw } from '../../types/api.types';
import './HomePage.css';

// Component definition
function HomePage() {
  const [selectedPersonId, setSelectedPersonId] = useState<PassengerId | null>(null);

  const onSelectPerson = useCallback((person: PersonRaw) => {
    setSelectedPersonId(person.PassengerId);
  }, []);

  return (
    <div className='container'>
      <h1>Titanic Dataset</h1>
      {selectedPersonId && (
        <div className='person-info-container'><PersonInfo id={selectedPersonId} /></div>
      )}
      <Dashboard onSelectPerson={onSelectPerson} />
      <div className='statistics-container'><Statistics /></div>
    </div>
  );
}

// Default export
export default HomePage;
