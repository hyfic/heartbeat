import React from 'react';
import { Advice } from './advice';
import { Examination } from './examination';
import { MedicalBioData } from './medicalBioData';
import { ScheduleAppointment } from './scheduleAppointment';

export const RecordForm: React.FC = () => {
  return (
    <div>
      <MedicalBioData />
      <Examination />
      <Advice />
      <ScheduleAppointment />
    </div>
  );
};
