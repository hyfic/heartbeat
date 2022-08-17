import { invoke } from '@tauri-apps/api/tauri';

// rust functions names
const CREATE_DATABASE_FUNCTION = 'add_database';
const READ_DATABASES_FUNCTION = 'read_databases';

export const createNewDatabaseHelper = (name: string, path: string) => {
  return new Promise((resolve, reject) => {
    invoke(CREATE_DATABASE_FUNCTION, {
      path,
      name,
    })
      .then(resolve)
      .catch(reject);
  });
};

export const readDatabasesHelper = () => {
  return new Promise((resolve, reject) => {
    invoke(READ_DATABASES_FUNCTION).then(resolve).catch(reject);
  });
};
