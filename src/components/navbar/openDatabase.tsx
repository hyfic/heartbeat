import React from 'react';
import { FileDatabase } from 'tabler-icons-react';
import { MenuItem } from '@chakra-ui/react';
import { open } from '@tauri-apps/api/dialog';
import { createNewDatabase } from '@/api/database.api';
import { platform } from '@tauri-apps/api/os';
import { useDatabaseStore } from '@/store/database.store';
import { showToast } from '@/utils/showToast';

export const OpenDatabase: React.FC = () => {
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
          showToast({
            title: `Opened ${databaseFileName} successfully`,
            status: 'success',
          });

          // update database store
          loadDatabases(databaseId);
        })
        .catch((err) => {
          showToast({
            title: err,
            description: 'Try running this application as administrator',
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
