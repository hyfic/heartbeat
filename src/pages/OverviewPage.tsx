import React from 'react';
import { Link } from 'react-router-dom';
import { DatabaseCheckerWrapper } from '../components/DatabaseCheckerWrapper';
import { Paths } from '../utils/paths';

export const OverviewPage: React.FC = () => {
  return (
    <DatabaseCheckerWrapper>
      <Link to={Paths.newPatient}>New patient</Link>
      <Link to={Paths.patient}>Patient page</Link>
      <Link to={Paths.patient + '/1'}>Patient page, 1</Link>
    </DatabaseCheckerWrapper>
  );
};
