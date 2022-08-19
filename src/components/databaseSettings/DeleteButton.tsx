import React, { useContext, useState } from 'react';
import { DatabaseType } from '../../types/database';
import { SetState } from '../../types/react';
import { Trash } from 'tabler-icons-react';
import {
  Button,
  Checkbox,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import { deleteDatabaseHelper } from '../../api/database';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';

interface Props {
  db: DatabaseType;
  setDatabases: SetState<DatabaseType[]>;
}

export const DeleteButton: React.FC<Props> = ({ db, setDatabases }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const { selectedDatabase, setSelectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const deleteDatabase = () => {
    setLoading(true);

    deleteDatabaseHelper(db.id, db.path, checked)
      .then(() => {
        if (selectedDatabase && db.id === selectedDatabase.id) {
          setSelectedDatabase(null);
        }
        setDatabases((prev: DatabaseType[]) => {
          return prev.filter((database) => database.id !== db.id);
        });

        toast({
          title: 'Deleted database successfully',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'success',
        });
        onClose();
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
    <>
      <IconButton
        aria-label='Delete database'
        colorScheme='red'
        variant='ghost'
        icon={<Trash strokeWidth={2} size={20} />}
        onClick={onOpen}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete database</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='lg'>
              Are you sure you want to delete {db.name} ? This action can't be
              undone.
            </Text>
            <Checkbox
              size='lg'
              mt={5}
              isChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            >
              Delete database content
            </Checkbox>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={loading}
              variant='outline'
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme='red'
              isLoading={loading}
              onClick={deleteDatabase}
            >
              Delete database
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
