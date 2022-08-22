import React, { useContext } from 'react';
import { FileDatabase } from 'tabler-icons-react';
import { MenuItem, useToast } from '@chakra-ui/react';
import { open } from '@tauri-apps/api/dialog';
import { createNewDatabaseHelper } from '../../api/database';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';

export const OpenDatabase: React.FC = () => {
  const toast = useToast();
  const { loadDatabases } = useContext(DatabaseContext) as DatabaseContextType;

  const selectDatabase = async () => {
    open({
      filters: [
        {
          name: 'Database',
          extensions: ['db'],
        },
      ],
    })
      .then((databasePath) => {
        if (typeof databasePath !== 'string') return;
        const databaseFileName = databasePath.split('\\').pop() || databasePath; // TODO change this to apply for macos & linux

        createNewDatabaseHelper(databaseFileName, databasePath)
          .then(() => {
            toast({
              title: 'Created database successfully',
              position: 'top-right',
              isClosable: true,
              duration: 3000,
              status: 'success',
            });
            loadDatabases(databasePath);
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
          });
      })
      .catch(() => {
        toast({
          title: 'Failed to open database',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
      });
  };

  return (
    <MenuItem icon={<FileDatabase />} onClick={selectDatabase}>
      Open database
    </MenuItem>
  );
};
