import React, { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { TextInput } from '../../common/TextInput';
import { AdviceMedicines } from './AdviceMedicines';
import {
  PatientAdviceType,
  PatientMedicineType,
  PatientRecordType,
} from '../../../types/patient';
import { SetState } from '../../../types/react';

interface Props {
  patientRecord: PatientRecordType;
  setPatientRecord: SetState<PatientRecordType>;
  loading?: boolean;
}

export const Advice: React.FC<Props> = ({
  patientRecord,
  setPatientRecord,
  loading,
}) => {
  const [medicines, setMedicines] = useState<PatientMedicineType[]>(
    patientRecord.advice?.medicines || []
  );
  const [advice, setAdvice] = useState(patientRecord.advice?.advice || '');
  const [investigationToDo, setInvestigationToDo] = useState(
    patientRecord.advice?.investigationToDo || ''
  );

  useEffect(() => {
    let patientAdvice: PatientAdviceType = {
      medicines,
      advice,
      investigationToDo,
    };

    let newPatientRecordType: PatientRecordType = {
      ...patientRecord,
      advice: patientAdvice,
    };

    setPatientRecord(newPatientRecordType);
  }, [advice, medicines, investigationToDo]);

  return (
    <div>
      <Heading mt={5} className='text-2xl' fontWeight='medium'>
        Advice
      </Heading>
      <AdviceMedicines
        medicines={medicines}
        setMedicines={setMedicines}
        loading={loading}
      />
      <TextInput
        title='Advice'
        value={advice}
        setValue={setAdvice}
        disabled={loading}
        textArea
        className='mt-2'
      />
      <TextInput
        title='Investigation to do'
        value={investigationToDo}
        setValue={setInvestigationToDo}
        disabled={loading}
        textArea
        className='mt-2'
      />
    </div>
  );
};
