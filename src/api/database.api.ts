import { DatabaseType } from '@/types/database.type';
import { invoke } from '@tauri-apps/api';

// rust function names
const READ_DATABASES = 'read_databases';
const ADD_DATABASE = 'add_database';
const UPDATE_DATABASE = 'update_database';
const DELETE_DATABASE = 'delete_database';

export const createNewDatabase = (path: string, name: string) => {
  return invoke(ADD_DATABASE, { path, name });
};

export const readDatabases = () => {
  return new Promise<DatabaseType[]>((resolve, reject) => {
    invoke(READ_DATABASES)
      .then((data: any) => resolve(data)) // the data returned will be in the format of `DatabaseType`
      .catch(reject);
  });
};

export const updateDatabase = (id: number, name: string) => {
  return invoke(UPDATE_DATABASE, {
    id,
    name,
  });
};

export const deleteDatabase = (
  id: number,
  path: string,
  deleteFile: boolean
) => {
  return invoke(DELETE_DATABASE, {
    id,
    path,
    deleteFile,
  });
};
