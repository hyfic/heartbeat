import React from 'react';
import { FileDatabase } from 'tabler-icons-react';
import { MenuItem, useToast } from '@chakra-ui/react';
import { open } from '@tauri-apps/api/dialog';
import { createNewDatabase } from '@/api/database.api';
import { platform } from '@tauri-apps/api/os';
import { useDatabaseStore } from '@/store/database.store';

export const OpenDatabase: React.FC = () => {
  const toast = useToast();
  const { loadDatabases } = useDatabaseStore();

  const openDatabaseHandler = async () => {
    const platformName = await platform(); // get platform name

    // open file explorer to select file with extension `*.db`
    open({
      filters: [
        {
          name: 'Database',
          extensions: ['db'],
        },
      ],
    }).then((databasePath) => {
      if (typeof databasePath !== 'string') return;

      // get file name from path according to OS
      const databaseFileName =
        (platformName == 'win32'
          ? databasePath.split('\\').pop()
          : databasePath.split('/').pop()) || databasePath;

      // index database in app.db
      createNewDatabase(databasePath, databaseFileName)
        .then((databaseId) => {
          toast({
            title: `Opened ${databaseFileName} successfully`,
            position: 'top-right',
            isClosable: true,
            duration: 3000,
            status: 'success',
          });

          // update database store
          loadDatabases(databaseId);
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
    });
  };

  return (
    <MenuItem icon={<FileDatabase />} onClick={openDatabaseHandler}>
      Open database
    </MenuItem>
  );
};
