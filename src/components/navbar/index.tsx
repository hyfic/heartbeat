import React from 'react';
import { Badge, Flex, IconButton } from '@chakra-ui/react';
import { useDatabaseStore } from '@/store/database.store';
import { DatabaseOptions } from './databaseOptions';
import { Navigation } from './navigation';
import { Paths } from '@/utils/paths';
import { Link } from 'react-router-dom';
import {
  CalendarEvent,
  Settings,
  Snowman,
  Stethoscope,
} from 'tabler-icons-react';

export const Navbar: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();

  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <DatabaseOptions />
        <Navigation page={Paths.patientList} className='mt-3'>
          <Snowman size={21} className='mr-1' /> Patients
        </Navigation>
        <Navigation page={Paths.appointments}>
          <CalendarEvent size={21} className='mr-1' /> Appointments
          <Badge ml={1}>2</Badge>
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
