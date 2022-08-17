import { invoke } from '@tauri-apps/api/tauri';

// rust functions names
const CREATE_DATABASE_FUNCTION = 'add_database';
const READ_DATABASES_FUNCTION = 'read_databases';
const EDIT_DATABASE_NAME_FUNCTION = 'update_database';
const DELETE_DATABASE_FUNCTION = 'delete_database';

export const createNewDatabaseHelper = (name: string, path: string) => {
  return invoke(CREATE_DATABASE_FUNCTION, {
    path,
    name,
  });
};

export const readDatabasesHelper = () => {
  return invoke(READ_DATABASES_FUNCTION);
};

export const editDatabaseHelper = (id: number, name: string) => {
  return invoke(EDIT_DATABASE_NAME_FUNCTION, {
    id,
    name,
  });
};

export const deleteDatabaseHelper = (
  id: number,
  path: string,
  deleteFile: boolean
) => {
  return invoke(DELETE_DATABASE_FUNCTION, {
    id,
    path,
    deleteFile,
  });
};
