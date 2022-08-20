import React from 'react';
import { PatientRecordType } from '../../../types/patient';
import { SetState } from '../../../types/react';
import { Advice } from './Advice';
import { Examination } from './Examination';
import { MedicalBioData } from './MedicalBioData';

interface Props {
  patientRecord: PatientRecordType;
  setPatientRecord: SetState<PatientRecordType>;
  loading: boolean;
}

export const RecordForm: React.FC<Props> = ({
  patientRecord,
  setPatientRecord,
  loading,
}) => {
  return (
    <div>
      <MedicalBioData
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
      <Examination
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
      <Advice
        patientRecord={patientRecord}
        setPatientRecord={setPatientRecord}
        loading={loading}
      />
    </div>
  );
};
