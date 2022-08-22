import React from 'react';
import { DatabaseOptions } from './DatabaseOptions';
import {
  CalendarEvent,
  Settings,
  Snowman,
  Stethoscope,
} from 'tabler-icons-react';
import { Navigation } from './Navigation';
import { Paths } from '../../utils/paths';
import { Flex, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <DatabaseOptions />
        <Navigation page={Paths.patientList} className='mt-3'>
          <Snowman size={21} className='mr-1' /> Patients
        </Navigation>
        <Navigation page={Paths.appointments}>
          <CalendarEvent size={21} className='mr-1' /> Appointments
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
