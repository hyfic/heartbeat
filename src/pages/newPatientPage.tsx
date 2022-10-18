import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, SimpleGrid, useToast } from '@chakra-ui/react';
import { useDatabaseStore } from '@/store/database.store';
import { TextInput } from '@/components/common/textInput';
import { createNewPatient } from '@/api/patient.api';
import { Paths } from '@/utils/paths';
import { DatabaseChecker } from '@/components/databaseChecker';

export const NewPatientPage: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { selectedDatabase } = useDatabaseStore();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Male');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const createPatientHandler = () => {
    if (!selectedDatabase) return;

    setLoading(true);

    createNewPatient(selectedDatabase.path, {
      name,
      age,
      sex,
      address,
      phone,
    })
      .then((patientId) => {
        toast({
          title: 'Saved patient data successfully',
          description: `${name} is in your list now :)`,
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        navigate(`${Paths.patient}/${patientId}`);
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Try running this application as administrator',
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
    <DatabaseChecker>
      <h1 className='text-2xl font-medium'>New patient</h1>
      <SimpleGrid mt={5} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <TextInput title='Name' value={name} setValue={setName} />
        <TextInput title='Age' value={age} setValue={setAge} />
        <div>
          <h2 className='mb-2 text-md'>Gender</h2>
          <Select
            variant='filled'
            value={sex}
            defaultValue={sex}
            onChange={(e) => setSex(e.target.value)}
            disabled={loading}
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Select>
        </div>
      </SimpleGrid>
      <TextInput
        title='Phone no'
        type='number'
        value={phone}
        setValue={setPhone}
        className='mt-3'
      />
      <TextInput
        title='Address'
        value={address}
        setValue={setAddress}
        className='mt-3'
        textArea
      />
      <Button
        mt={5}
        w='full'
        colorScheme='teal'
        disabled={name.trim().length == 0}
        isLoading={loading}
        onClick={createPatientHandler}
      >
        Create Patient
      </Button>
    </DatabaseChecker>
  );
};
