// This component check, if there is any database selected, if not it ask to create a database

import { useContext } from 'react';
import { ReactComponent } from '../types/react';
import { Database } from 'tabler-icons-react';
import { Button } from '@chakra-ui/react';
import { CreateDatabaseWrapper } from './navbar/CreateDatabaseWrapper';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../context/DatabaseContext';

export const DatabaseCheckerWrapper: ReactComponent = ({ children }) => {
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  return (
    <div>
      {!selectedDatabase && (
        <div className='h-screen -mx-5 -my-3 w-full flex flex-col items-center justify-center'>
          <h2 className='text-lg font-medium'>No database selected</h2>
          <CreateDatabaseWrapper>
            <Button colorScheme='teal' mt={3} variant='outline'>
              <Database className='mr-2' /> Create new database
            </Button>
          </CreateDatabaseWrapper>
        </div>
      )}
      {selectedDatabase && children}
    </div>
  );
};
