import React, { useContext } from 'react';
import { DatabaseCheckerWrapper } from '../components/DatabaseCheckerWrapper';
import { PatientContext, PatientContextType } from '../context/PatientContext';
import { PatientList } from '../components/patientList';

export const PatientListPage: React.FC = () => {
  const { loading, patients } = useContext(
    PatientContext
  ) as PatientContextType;

  return (
    <DatabaseCheckerWrapper>
      <h1 className='text-2xl font-medium'>Patients</h1>
      {loading && <p className='mt-5'>Loading ...</p>}
      <PatientList patients={patients} />
    </DatabaseCheckerWrapper>
  );
};
