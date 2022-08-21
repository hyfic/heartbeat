import React, { useContext, useEffect, useState } from 'react';
import { TextInput } from '../components/common/TextInput';
import { DatabaseCheckerWrapper } from '../components/DatabaseCheckerWrapper';
import { DoctorContext, DoctorContextType } from '../context/DoctorContext';
import { Button, useToast } from '@chakra-ui/react';
import { createDoctorHelper, updateDoctorHelper } from '../api/doctor';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../context/DatabaseContext';

export const DoctorPage: React.FC = () => {
  const toast = useToast();

  const { doctor, setDoctor } = useContext(DoctorContext) as DoctorContextType;
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const [doctorName, setDoctorName] = useState('');
  const [doctorQualification, setDoctorQualification] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDoctorName(doctor?.name || '');
    setDoctorQualification(doctor?.qualification || '');
  }, [selectedDatabase, doctor]);

  const handleButton = () => {
    if (!selectedDatabase) return;

    setLoading(true);

    // if doctor exists we need to update else we need to create doctor
    let doctorFunction = doctor ? updateDoctorHelper : createDoctorHelper;

    doctorFunction(selectedDatabase.path, doctorName, doctorQualification)
      .then(() => {
        toast({
          title: 'Updated details successfully',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'success',
        });
        setDoctor({ name: doctorName, qualification: doctorQualification });
      })
      .catch((err) => {
        toast({
          title: err,
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <DatabaseCheckerWrapper>
      <h1 className='text-2xl font-medium'>Doctor</h1>
      <TextInput
        title='Name'
        disableTitle
        value={doctorName}
        setValue={setDoctorName}
        className='mt-5'
        disabled={loading}
      />
      <TextInput
        title='Qualification'
        disableTitle
        value={doctorQualification}
        setValue={setDoctorQualification}
        className='mt-5'
        textArea
        disabled={loading}
      />
      <Button
        onClick={handleButton}
        mt={5}
        colorScheme='teal'
        w='full'
        isLoading={loading}
      >
        Edit details
      </Button>
    </DatabaseCheckerWrapper>
  );
};
