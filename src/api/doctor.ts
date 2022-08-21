import { invoke } from '@tauri-apps/api/tauri';

const CREATE_DOCTOR_FUNCTION = 'add_doctor';
const READ_DOCTOR_FUNCTION = 'read_doctor';
const UPDATE_DOCTOR_FUNCTION = 'update_doctor';

export const createDoctorHelper = (
  databasePath: string,
  name: string,
  qualification: string
) => {
  return invoke(CREATE_DOCTOR_FUNCTION, {
    databasePath,
    name,
    qualification,
  });
};

export const readDoctorHelper = (databasePath: string) => {
  return invoke(READ_DOCTOR_FUNCTION, { databasePath });
};

export const updateDoctorHelper = (
  databasePath: string,
  name: string,
  qualification: string
) => {
  return invoke(UPDATE_DOCTOR_FUNCTION, {
    databasePath,
    name,
    qualification,
  });
};
