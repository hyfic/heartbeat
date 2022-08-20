import React, { useContext, useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  SimpleGrid,
  Select,
  IconButton,
} from '@chakra-ui/react';
import { PatientDataType } from '../../types/patient';
import { SetState } from '../../types/react';
import { Edit } from 'tabler-icons-react';
import { TextInput } from '../common/TextInput';
import { updatePatientHelper } from '../../api/patient';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';
import {
  PatientContext,
  PatientContextType,
} from '../../context/PatientContext';

interface Props {
  patientId: number;
  patientData: PatientDataType;
  setPatientData: SetState<PatientDataType>;
}

export const EditBioData: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
}) => {
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;
  const { editPatient } = useContext(PatientContext) as PatientContextType;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const patientBioData = patientData.bioData;

  const [name, setName] = useState(patientBioData?.name || '');
  const [age, setAge] = useState(patientBioData?.age || '');
  const [sex, setSex] = useState(patientBioData?.sex || 'Male');
  const [address, setAddres] = useState(patientBioData?.address || '');
  const [loading, setLoading] = useState(false);

  const savePatient = () => {
    if (!selectedDatabase) return;

    setLoading(true);

    let newPatientData: PatientDataType = {
      ...patientData,
      bioData: {
        name,
        age,
        sex,
        address,
      },
      updatedAt: Date.now(),
    };

    updatePatientHelper(
      selectedDatabase?.path,
      patientId,
      JSON.stringify(newPatientData)
    )
      .then(() => {
        toast({
          title: 'Edited patient biodata successfully',
          description: 'Latest changes in database',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        setPatientData(newPatientData);
        editPatient(patientId, newPatientData);
        onClose();
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Please try again or report this as bug',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
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
              title='Address'
              value={address}
              setValue={setAddres}
              className='mt-5'
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
              onClick={savePatient}
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
