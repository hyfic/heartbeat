import { invoke } from '@tauri-apps/api/tauri';

// rust functions names
const CREATE_PATIENT_FUNCTION = 'create_patient';
const READ_PATIENTS_FUNCTION = 'read_patients';
const READ_PATIENT_FUNCTION = 'read_patient';
const UPDATE_PATIENT_FUNCTION = 'update_patient';
const DELETE_PATIENT_FUNCTION = 'delete_patient';

export const createPatientHelper = (databasePath: string, data: string) => {
  return invoke(CREATE_PATIENT_FUNCTION, {
    databasePath,
    data,
  });
};

export const readPatientsHelper = (databasePath: string) => {
  return invoke(READ_PATIENTS_FUNCTION, { databasePath });
};

export const readPatientHelper = (databasePath: string, patientId: number) => {
  return invoke(READ_PATIENT_FUNCTION, {
    databasePath,
    patientId,
  });
};

export const updatePatientHelper = (
  databasePath: string,
  patientId: number,
  data: string
) => {
  return invoke(UPDATE_PATIENT_FUNCTION, {
    databasePath,
    patientId,
    data,
  });
};

export const deletePatientHelper = (
  databasePath: string,
  patientId: number
) => {
  return invoke(DELETE_PATIENT_FUNCTION, {
    databasePath,
    patientId,
  });
};
