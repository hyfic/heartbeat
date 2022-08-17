import { invoke } from '@tauri-apps/api/tauri';

// rust functions names
const CREATE_PATIENT_FUNCTION = 'create_patient';

export const createPatient = (databasePath: string, data: string) => {
  return invoke(CREATE_PATIENT_FUNCTION, {
    databasePath,
    data,
  });
};
