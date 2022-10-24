import React, { useState } from 'react';
import { useIndividualPatientStore } from '@/store/patient.store';
import { useDatabaseStore } from '@/store/database.store';
import { PatientType } from '@/types/patient.type';
import { updatePatient } from '@/api/patient.api';
import { showToast } from '@/utils/showToast';
import { TextInput } from '@/components/common/textInput';
import { Edit } from 'tabler-icons-react';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';

export const EditBioData: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedDatabase } = useDatabaseStore();
  const { patient, setPatient } = useIndividualPatientStore();

  const patientBioData = patient?.bioData;

  const [name, setName] = useState(patientBioData?.name || '');
  const [age, setAge] = useState(patientBioData?.age || '');
  const [sex, setSex] = useState(patientBioData?.sex || 'Male');
  const [address, setAddress] = useState(patientBioData?.address || '');
  const [phone, setPhone] = useState(patientBioData?.phone || '');
  const [loading, setLoading] = useState(false);

  const editBioData = () => {
    if (!selectedDatabase || !patient) return;

    setLoading(true);

    let updatedPatientData: PatientType = {
      ...patient,
      bioData: {
        name,
        age,
        sex,
        address,
        phone,
      },
      updatedAt: Date.now().toString(),
    };

    updatePatient(selectedDatabase.path, updatedPatientData)
      .then(() => {
        showToast({
          title: 'Edited bio data',
          status: 'success',
        });

        setPatient(updatedPatientData);
        onClose();
      })
      .catch((err) => {
        showToast({
          title: err,
          description: 'Please try again or report this as bug',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <IconButton
        aria-label='Edit patient'
        icon={<Edit size={20} strokeWidth={2} />}
        colorScheme='blue'
        variant='ghost'
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit patient</ModalHeader>
          <ModalCloseButton disabled={loading} />
          <ModalBody>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
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
          </ModalBody>

          <ModalFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              colorScheme='teal'
              onClick={editBioData}
              isLoading={loading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
