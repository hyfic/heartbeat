import React, { useState } from 'react';
import { Trash } from 'tabler-icons-react';
import { DatabaseType } from '@/types/database.type';
import { useDatabaseStore } from '@/store/database.store';
import { deleteDatabase } from '@/api/database.api';
import { showToast } from '@/utils/showToast';
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  MenuItem,
} from '@chakra-ui/react';

interface Props {
  db: DatabaseType;
}

export const DeleteButton: React.FC<Props> = ({ db }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  const {
    setSelectedDatabase,
    selectedDatabase,
    deleteDatabase: deleteDatabaseFromStore,
  } = useDatabaseStore();

  const deleteDatabaseHandler = () => {
    setLoading(true);

    deleteDatabase(db.id, db.path, checked)
      .then(() => {
        // if database is selected, then clear the selected database
        if (selectedDatabase && db.id === selectedDatabase.id) {
          setSelectedDatabase(null);
        }

        // update database store by removing deleted element
        deleteDatabaseFromStore(db.id);

        showToast({
          title: 'Deleted database successfully',
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
      <MenuItem
        icon={<Trash strokeWidth={2} size={18} />}
        textColor='red.400'
        onClick={onOpen}
      >
        Delete database
      </MenuItem>

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
              onClick={deleteDatabaseHandler}
            >
              Delete database
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
