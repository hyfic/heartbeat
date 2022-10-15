import create from 'zustand';
import { readDatabases } from '@/api/database.api';
import { DatabaseType } from '@/types/database.type';

interface DatabaseStore {
  databases: DatabaseType[];
  selectedDatabase: DatabaseType | null;
  loadDatabases: (selectDatabaseWithId?: number) => void;
  setSelectedDatabase: (selectedDatabase: DatabaseType) => void;
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
  databases: [],
  selectedDatabase: null,
  setSelectedDatabase: (selectedDatabase) => set({ selectedDatabase }),
  loadDatabases(selectDatabaseWithId?: number) {
    readDatabases().then((databases) => {
      set({ databases });

      // select database if id is given
      if (selectDatabaseWithId) {
        // check if database exist in loaded data
        let filteredDatabase = databases.filter(
          (database) => database.id === selectDatabaseWithId
        );
        console.log(filteredDatabase);
        if (filteredDatabase.length == 1) {
          set({ selectedDatabase: filteredDatabase[0] });
        }
      }
    });
  },
}));
