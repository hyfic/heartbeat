import create from 'zustand';
import { readDatabases } from '@/api/database.api';
import { DatabaseType } from '@/types/database.type';

interface DatabaseStore {
  databases: DatabaseType[];
  selectedDatabase: DatabaseType | null;
  loadDatabases: (selectDatabaseWithId?: number) => void;
  setSelectedDatabase: (selectedDatabase: DatabaseType | null) => void;
  deleteDatabase: (databaseId: number) => void;
  editDatabase: (databaseId: number, databaseName: string) => void;
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

        if (filteredDatabase.length == 1) {
          set({ selectedDatabase: filteredDatabase[0] });
        }
      }
    });
  },
  deleteDatabase(databaseId: number) {
    set({ databases: this.databases.filter((db) => db.id !== databaseId) });
  },
  editDatabase(databaseId: number, databaseName: string) {
    set({
      databases: this.databases.map((db) => {
        if (databaseId === db.id) {
          db.name = databaseName;
        }

        return db;
      }),
    });
  },
}));
