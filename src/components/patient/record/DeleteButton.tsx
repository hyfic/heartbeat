import React, { useContext, useState } from 'react';
import { Trash } from 'tabler-icons-react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SetState } from '../../../types/react';
import { PatientDataType } from '../../../types/patient';
import { updatePatientHelper } from '../../../api/patient';
import {
  PatientContext,
  PatientContextType,
} from '../../../context/PatientContext';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../../context/DatabaseContext';

interface Props {
  patientId: number;
  patientData: PatientDataType;
  setPatientData: SetState<PatientDataType>;
  currentRecordCreatedAt: number;
}

export const DeleteButton: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
  currentRecordCreatedAt,
}) => {
  const { editPatient } = useContext(PatientContext) as PatientContextType;
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const cancelRef = React.useRef<any>();

  const [loading, setLoading] = useState(false);

  const deleteRecord = () => {
    if (!selectedDatabase) return;

    setLoading(true);

    let patientRecords = (patientData.records || []).filter(
      (record) => record.createdAt !== currentRecordCreatedAt
    );

    let patientNewData: PatientDataType = {
      ...patientData,
      records: patientRecords,
      updatedAt: Date.now(),
    };

    updatePatientHelper(
      selectedDatabase?.path,
      patientId,
      JSON.stringify(patientNewData)
    )
      .then(() => {
        toast({
          title: 'Deleted patient record successfully',
          description: 'Latest changes in database',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
        editPatient(patientId, patientNewData);

        setPatientData(patientNewData);
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
        aria-label='delete'
        variant='ghost'
        colorScheme='red'
        icon={<Trash size={18} strokeWidth={2} />}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Are you sure ?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='outline' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={deleteRecord}
                isLoading={loading}
                ml={3}
              >
                Delete record
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
