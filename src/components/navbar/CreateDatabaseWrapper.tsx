import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Input,
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
import { documentDir } from '@tauri-apps/api/path';
import { createNewDatabaseHelper } from '../../api/database';
import { open } from '@tauri-apps/api/dialog';
import { ReactComponent } from '../../types/react';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';

export const CreateDatabaseWrapper: ReactComponent = ({ children }) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [databaseName, setDatabaseName] = useState('');
  const [databasePath, setDatabasePath] = useState('');

  const { loadDatabases } = useContext(DatabaseContext) as DatabaseContextType;

  const onClose = () => {
    setLoading(false);
    setDatabaseName('');
    setDatabasePath('');
    closeModal();
  };

  const getDefaultPath = () => {
    documentDir()
      .then((documentDirectory) => setDatabasePath(documentDirectory))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getDefaultPath, []);

  const openDirectoryPicker = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: databasePath,
    });

    if (selected !== null && !Array.isArray(selected)) {
      setDatabasePath(selected + '\\'); // TODO: change this when this app is shipped for macos/linux
    }
  };

  const createDatabase = () => {
    setLoading(true);

    let databaseFilePath = `${databasePath}${databaseName
      .split(' ')
      .join('_')}.db`;

    createNewDatabaseHelper(databaseName, databaseFilePath)
      .then(() => {
        onClose();
        toast({
          title: 'Created database successfully',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'success',
        });
        loadDatabases(databaseFilePath);
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
      <div onClick={onOpen}>{children}</div>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create database</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='Database name'
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
            />
            <Button
              mt={3}
              w='full'
              fontWeight='normal'
              className='flex justify-start'
              onClick={openDirectoryPicker}
            >
              {databasePath.trim().length !== 0
                ? databasePath
                : 'Select folder'}
            </Button>
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
                databaseName.trim().length === 0 ||
                databasePath.trim().length === 0
              }
              isLoading={loading}
              onClick={createDatabase}
            >
              Create database
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
