import React, { useEffect, useState } from 'react';
import { DatabaseChecker } from '@/components/databaseChecker';
import { useDoctorStore } from '@/store/doctor.store';
import { useDatabaseStore } from '@/store/database.store';
import { TextInput } from '@/components/common/textInput';
import { Button } from '@chakra-ui/react';

export const DoctorPage: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();
  const { name, qualification, loading, loadData, addData, editData } =
    useDoctorStore();

  const [doctorName, setDoctorName] = useState('');
  const [doctorQualification, setDoctorQualification] = useState('');

  const handleButtonClick = () => {
    if (!selectedDatabase) return;

    let formFunction = !name && !doctorQualification ? addData : editData; // choosing whether we need to add data or edit data

    formFunction(selectedDatabase.path, doctorName, doctorQualification);
  };

  // load doctor details initially
  useEffect(() => {
    if (!selectedDatabase) return;
    loadData(selectedDatabase.path);
  }, [selectedDatabase]);

  // change states whenever there is an update in store
  useEffect(() => {
    setDoctorName(name || '');
    setDoctorQualification(qualification || '');
  }, [selectedDatabase, name, qualification]);

  return (
    <DatabaseChecker>
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
        onClick={handleButtonClick}
        mt={5}
        colorScheme='teal'
        w='full'
        isLoading={loading}
        disabled={name === doctorName && qualification === doctorQualification}
      >
        Save details
      </Button>
    </DatabaseChecker>
  );
};
