import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { Trash } from 'tabler-icons-react';
import { Paths } from '../../utils/paths';
import {
  PatientContext,
  PatientContextType,
} from '../../context/PatientContext';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';
import { deletePatientHelper } from '../../api/patient';

interface Props {
  patientId: number;
  patientName?: string;
}

export const DeletePatient: React.FC<Props> = ({ patientId, patientName }) => {
  const { deletePatient } = useContext(PatientContext) as PatientContextType;
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<any>();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const deletePatientHandler = () => {
    setLoading(true);

    if (!selectedDatabase) return;

    deletePatientHelper(selectedDatabase.path, patientId)
      .then(() => {
        toast({
          title: `Say bye to ${patientName}`,
          description: 'Deleted patient data successfully',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
        onClose();
        deletePatient(patientId);
        navigate(Paths.patient, { replace: true });
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
              Delete {patientName}
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
