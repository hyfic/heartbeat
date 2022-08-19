import React from 'react';
import { useParams } from 'react-router-dom';

export const PatientPage: React.FC = () => {
  const { id } = useParams();

  return <div>PatientPage {id}</div>;
};
