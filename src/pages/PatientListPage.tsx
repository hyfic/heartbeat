import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'tabler-icons-react';
import { Paths } from '../utils/paths';
import { Button, Flex } from '@chakra-ui/react';
import { DatabaseCheckerWrapper } from '../components/DatabaseCheckerWrapper';

export const PatientListPage: React.FC = () => {
  return (
    <DatabaseCheckerWrapper>
      <Flex alignItems='center' justifyContent='space-between'>
        <h1 className='text-2xl font-medium'>Patients</h1>
        <Link to={Paths.newPatient}>
          <Button>
            <UserPlus size={18} className='mr-2' /> New patient
          </Button>
        </Link>
      </Flex>
    </DatabaseCheckerWrapper>
  );
};
