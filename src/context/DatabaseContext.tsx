import { useToast } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';
import { readDatabasesHelper } from '../api/database';
import { DatabaseType } from '../types/database';
import { ReactComponent, SetState } from '../types/react';

export interface DatabaseContextType {
  databases: DatabaseType[];
  setDatabases: SetState<DatabaseType[]>;
  selectedDatabase: DatabaseType | null;
  setSelectedDatabase: SetState<DatabaseType | null>;
  loading: boolean;
  setLoading: SetState<boolean>;
  loadDatabases: () => void;
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseContextWrapper: ReactComponent = ({ children }) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [databases, setDatabases] = useState<DatabaseType[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseType | null>(
    null
  );

  const loadDatabases = (databasePath?: string) => {
    setLoading(true);

    readDatabasesHelper()
      .then((data: any) => {
        setDatabases(data);

        // if database path is given (which means this loading is happening after database creation) so we need to make this database as selected
        if (databasePath) {
          let filteredDatabases = data.filter(
            (db: DatabaseType) => db.path === databasePath
          );
          if (filteredDatabases.length !== 0) {
            setSelectedDatabase(filteredDatabases[0]);
          }
        }
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

  useEffect(() => {
    loadDatabases();
  }, []);

  useEffect(() => {
    const databaseId = localStorage.getItem('selectedDatabaseId');
    if (!databaseId) return;

    let filteredDatabases = databases.filter(
      (db) => db.id === JSON.parse(databaseId)
    );

    if (filteredDatabases.length !== 0) {
      setSelectedDatabase(filteredDatabases[0]);
    }
  }, [databases]);

  return (
    <DatabaseContext.Provider
      value={{
        databases,
        setDatabases,
        selectedDatabase: selectedDatabase,
        setSelectedDatabase: setSelectedDatabase,
        loading,
        setLoading,
        loadDatabases,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
