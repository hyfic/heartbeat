import React, { useState } from 'react';
import { DatabaseType } from '../../types/database';
import {
  Button,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Edit } from 'tabler-icons-react';
import { editDatabaseHelper } from '../../api/database';
import { SetState } from '../../types/react';

interface Props {
  db: DatabaseType;
  setDatabases: SetState<DatabaseType[]>;
}

export const EditButton: React.FC<Props> = ({ db, setDatabases }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [databaseName, setDatabaseName] = useState(db.name);
  const [loading, setLoading] = useState(false);

  const editDatabaseHandler = () => {
    setLoading(true);

    editDatabaseHelper(db.id, databaseName)
      .then(() => {
        setDatabases((prev: DatabaseType[]) => {
          return prev.map((database) => {
            if (db.id === database.id) {
              database.name = databaseName;
            }

            return database;
          });
        });
        toast({
          title: 'Edited database name successfully',
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
      <MenuItem icon={<Edit strokeWidth={2} size={18} />} onClick={onOpen}>
        Edit database
      </MenuItem>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit database</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='Database name'
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
            />
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
              colorScheme='teal'
              disabled={
                databaseName.trim().length === 0 || db.name === databaseName
              }
              isLoading={loading}
              onClick={editDatabaseHandler}
            >
              Edit database
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
