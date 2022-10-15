import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useDatabaseStore } from '@/store/database.store';
import { DatabaseOptions } from './databaseOptions';

export const Navbar: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();

  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <DatabaseOptions />
      </Flex>
    </Flex>
  );
};
