import { useToast } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import { readDatabasesHelper } from '../api/database';
import { DatabaseType } from '../types/database';
import { ReactComponent, SetState } from '../types/react';

export interface DatabaseContextType {
  databases: DatabaseType[];
  setDatabases: SetState<DatabaseType[]>;
  selectedDatabasePath: string;
  setSelectedDatabasePath: SetState<string>;
  loading: boolean;
  setLoading: SetState<boolean>;
  loadDatabases: () => void;
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseContextWrapper: ReactComponent = ({ children }) => {
  const toast = useToast();

  const [databases, setDatabases] = useState<DatabaseType[]>([]);
  const [selectedDatabasePath, setSelectedDatabasePath] = useState(
    localStorage.getItem('selectedDatabasePath') || ''
  );
  const [loading, setLoading] = useState(false);

  const loadDatabases = () => {
    setLoading(true);

    readDatabasesHelper()
      .then((data: any) => setDatabases(data))
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

  useEffect(() => {
    loadDatabases();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        databases,
        setDatabases,
        selectedDatabasePath,
        setSelectedDatabasePath,
        loading,
        setLoading,
        loadDatabases,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
