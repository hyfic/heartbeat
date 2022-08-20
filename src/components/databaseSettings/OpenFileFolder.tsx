import React from 'react';
import { File } from 'tabler-icons-react';
import { MenuItem } from '@chakra-ui/react';
import { open } from '@tauri-apps/api/shell';

interface Props {
  databasePath: string;
}

export const OpenFileFolder: React.FC<Props> = ({ databasePath }) => {
  const databaseSplit = databasePath.split('\\');
  databaseSplit.pop(); // remove file name

  const dbPath = databaseSplit.join('/');

  const openFile = async () => {
    await open(dbPath);
  };

  return (
    <MenuItem icon={<File size={18} />} onClick={openFile}>
      Open file in explorer
    </MenuItem>
  );
};
