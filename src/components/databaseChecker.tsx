// A wrapper for database need pages, eg: Patient list, appointments etc
// Checks if there is a database selected, if not show option to create one

import { ReactComponent } from '@/types/react.type';
import { useDatabaseStore } from '@/store/database.store';
import { CreateDatabaseWrapper } from './navbar/createDatabaseWrapper';
import { Button } from '@chakra-ui/react';
import { Database } from 'tabler-icons-react';

export const DatabaseChecker: ReactComponent = ({ children }) => {
  const { selectedDatabase } = useDatabaseStore();

  return selectedDatabase ? (
    <>{children}</>
  ) : (
    <div className='h-screen -mx-5 -my-3 w-full flex flex-col items-center justify-center'>
      <h2 className='text-lg font-medium'>No database selected</h2>
      <CreateDatabaseWrapper>
        <Button colorScheme='teal' mt={3} variant='outline'>
          <Database className='mr-2' /> Create new database
        </Button>
      </CreateDatabaseWrapper>
    </div>
  );
};
