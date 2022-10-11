import { readDatabases } from '@/api/database.api';
import { DatabaseType } from '@/types/database.type';
import create from 'zustand';

interface DatabaseStore {
  databases: DatabaseType[];
  selectedDatabase: DatabaseType | null;
  loadDatabases: () => void;
  setSelectedDatabase: (selectedDatabase: DatabaseType) => void;
}

export const useDatabaseStore = create<DatabaseStore>((set) => ({
  databases: [],
  selectedDatabase: null,
  setSelectedDatabase: (selectedDatabase) => set({ selectedDatabase }),
  loadDatabases() {
    readDatabases().then((databases) => {
      console.log(databases);
    });
  },
}));
