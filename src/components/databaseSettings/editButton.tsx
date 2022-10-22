import React, { useState } from 'react';
import { Edit } from 'tabler-icons-react';
import { DatabaseType } from '@/types/database.type';
import { updateDatabase } from '@/api/database.api';
import { useDatabaseStore } from '@/store/database.store';
import { TextInput } from '@/components/common/textInput';
import { showToast } from '@/utils/showToast';
import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  db: DatabaseType;
}

export const EditButton: React.FC<Props> = ({ db }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [databaseName, setDatabaseName] = useState(db.name);
  const [loading, setLoading] = useState(false);

  const { editDatabase, setSelectedDatabase } = useDatabaseStore();

  const editDatabaseHandler = () => {
    setLoading(true);

    updateDatabase(db.id, databaseName)
      .then(() => {
        // edit database store
        editDatabase(db.id, databaseName);

        // update selectedDatabase if database is the selected one
        setSelectedDatabase({
          ...db,
          name: databaseName,
        });

        showToast({
          title: 'Edited database name successfully',
          status: 'success',
        });
        onClose();
      })
      .catch((err) => {
        showToast({
          title: err,
          description: 'Try running this application as administrator',
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
            <TextInput
              title='Database name'
              disableTitle
              value={databaseName}
              setValue={setDatabaseName}
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
