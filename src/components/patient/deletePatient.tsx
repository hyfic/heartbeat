import React, { useState } from 'react';
import { useDatabaseStore } from '@/store/database.store';
import { useIndividualPatientStore } from '@/store/patient.store';
import { useNavigate } from 'react-router-dom';
import { deletePatient } from '@/api/patient.api';
import { showToast } from '@/utils/showToast';
import { Paths } from '@/utils/paths';
import { Trash } from 'tabler-icons-react';
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

export const DeletePatient: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<any>();
  const navigate = useNavigate();

  const { selectedDatabase } = useDatabaseStore();
  const { patient, setPatient } = useIndividualPatientStore();

  const [loading, setLoading] = useState(false);

  const deletePatientHandler = () => {
    if (!selectedDatabase || !patient) return;

    setLoading(true);

    deletePatient(selectedDatabase.path, patient.id)
      .then(() => {
        showToast({
          title: `Say bye to ${patient.bioData.name}`,
          description: 'Deleted patient data successfully',
          status: 'success',
        });
        onClose();
        setPatient(null);
        navigate(Paths.patientList, { replace: true });
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
        aria-label='Delete patient'
        icon={<Trash size={20} strokeWidth={2} />}
        colorScheme='red'
        variant='ghost'
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {patient?.bioData.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant='outline'
                ref={cancelRef}
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={deletePatientHandler}
                ml={3}
                isLoading={loading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
