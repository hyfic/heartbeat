import React from 'react';
import { DatabaseOptions } from './DatabaseOptions';
import { CalendarEvent, Planet, Snowman } from 'tabler-icons-react';
import { Navigation } from './Navigation';
import { Paths } from '../../utils/paths';

export const Navbar: React.FC = () => {
  return (
    <div>
      <DatabaseOptions />
      <Navigation page={Paths.home} className='mt-3'>
        <Planet size={21} className='mr-1' /> Overview
      </Navigation>
      <Navigation page={Paths.patient}>
        <Snowman size={21} className='mr-1' /> Patients
      </Navigation>
      <Navigation page={Paths.appointments}>
        <CalendarEvent size={21} className='mr-1' /> Appointments
      </Navigation>
    </div>
  );
};
