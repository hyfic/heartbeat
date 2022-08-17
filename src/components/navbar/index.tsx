import React from 'react';
import { DatabaseOptions } from './DatabaseOptions';
import { CalendarEvent, Planet, Settings, Snowman } from 'tabler-icons-react';
import { Navigation } from './Navigation';
import { Paths } from '../../utils/paths';
import { Flex, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <DatabaseOptions />
        <Navigation page={Paths.overview} className='mt-3'>
          <Planet size={21} className='mr-1' /> Overview
        </Navigation>
        <Navigation page={Paths.patient}>
          <Snowman size={21} className='mr-1' /> Patients
        </Navigation>
        <Navigation page={Paths.appointments}>
          <CalendarEvent size={21} className='mr-1' /> Appointments
        </Navigation>
      </Flex>
      <div>
        <Link to={Paths.settings}>
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
