import React, { useContext } from 'react';
import { DatabaseOptions } from './DatabaseOptions';
import { Navigation } from './Navigation';
import { Paths } from '../../utils/paths';
import { Badge, Flex, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  CalendarEvent,
  Settings,
  Snowman,
  Stethoscope,
} from 'tabler-icons-react';
import {
  PatientContext,
  PatientContextType,
} from '../../context/PatientContext';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';

export const Navbar: React.FC = () => {
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;
  const { appointedPatients } = useContext(
    PatientContext
  ) as PatientContextType;

  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <DatabaseOptions />
        <Navigation page={Paths.patientList} className='mt-3'>
          <Snowman size={21} className='mr-1' /> Patients
        </Navigation>
        <Navigation page={Paths.appointments}>
          <CalendarEvent size={21} className='mr-1' /> Appointments
          <Badge ml={1}>{selectedDatabase && appointedPatients.length}</Badge>
        </Navigation>
        <Navigation page={Paths.doctor}>
          <Stethoscope size={21} className='mr-1' /> Doctor
        </Navigation>
      </Flex>
      <div>
        <Link to={Paths.settings} replace>
          <IconButton
            aria-label='settings'
            icon={<Settings size={21} />}
            variant='ghost'
          />
        </Link>
      </div>
    </Flex>
  );
};
