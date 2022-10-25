import React, { useState } from 'react';
import { useDatabaseStore } from '@/store/database.store';
import { useIndividualPatientStore } from '@/store/patient.store';
import { updatePatient } from '@/api/patient.api';
import { showToast } from '@/utils/showToast';
import { Trash } from 'tabler-icons-react';
import { PatientType } from '@/types/patient.type';
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
} from '@chakra-ui/react';

interface Props {
  recordCreatedAt: string;
}

export const DeleteRecord: React.FC<Props> = ({ recordCreatedAt }) => {
  const { selectedDatabase } = useDatabaseStore();
  const { patient, setPatient } = useIndividualPatientStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<any>();

  const [loading, setLoading] = useState(false);

  const handleDeleteRecord = () => {
    if (!selectedDatabase || !patient) return;

    setLoading(true);

    // filtering and removing record with given created at
    let patientRecords = patient.records.filter(
      (record) => record.createdAt !== recordCreatedAt
    );

    // assigning appointment from last record
    let appointment = '';

    if (patientRecords.length > 0 && patientRecords[0].appointment) {
      appointment = patientRecords[0].appointment;
    }

    let patientData: PatientType = {
      ...patient,
      records: patientRecords,
      appointment,
    };

    updatePatient(selectedDatabase.path, patientData)
      .then(() => {
        setPatient(patientData);
        showToast({
          title: 'Deleted patient record successfully',
          description: 'Latest changes in database',
          status: 'success',
        });
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
        onClose();
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
                onClick={handleDeleteRecord}
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
