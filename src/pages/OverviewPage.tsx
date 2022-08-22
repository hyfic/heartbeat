import React, { useContext, useEffect } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { DatabaseCheckerWrapper } from '../components/DatabaseCheckerWrapper';
import { PatientContext, PatientContextType } from '../context/PatientContext';
import { OverviewData } from '../components/overview/OverviewData';
import { Plus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Paths } from '../utils/paths';
import { PatientOverview } from '../components/overview/PatientOverview';

export const OverviewPage: React.FC = () => {
  const { patients, appointedPatients } = useContext(
    PatientContext
  ) as PatientContextType;

  return (
    <DatabaseCheckerWrapper>
      <Flex mb={5} alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <OverviewData
            title='Total patients'
            affix={patients.length}
            prefix='Patients'
          />
          <OverviewData
            title='Total appointments'
            affix={appointedPatients.length}
            prefix='Patients'
          />
        </Flex>
        <Link to={Paths.newPatient} replace>
          <Button>
            <Plus size={18} className='mr-1' /> New patient
          </Button>
        </Link>
      </Flex>
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {patients.map((patient) => {
          return (
            <PatientOverview
              key={patient.id}
              patientId={patient.id}
              patient={JSON.parse(patient.data)}
            />
          );
        })}
      </div>
    </DatabaseCheckerWrapper>
  );
};
