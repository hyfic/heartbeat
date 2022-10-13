import { DoctorType } from '@/types/doctor.type';
import { invoke } from '@tauri-apps/api';

// rust function name
const ADD_DOCTOR = 'add_doctor';
const READ_DOCTOR = 'read_doctor';
const UPDATE_DOCTOR = 'update_doctor';

export const addDoctor = (
  databasePath: string,
  name: string,
  qualification: string
) => {
  return invoke(ADD_DOCTOR, { databasePath, name, qualification });
};

export const readDoctor = (databasePath: string) => {
  return new Promise<DoctorType>((resolve, reject) => {
    invoke(READ_DOCTOR, { databasePath })
      .then((data: any) => {
        // data will be doctor inside an array `DoctorType[]`, so we need to return first element of that array
        resolve(data[0]);
      })
      .catch(reject);
  });
};

export const updateDoctor = (
  databasePath: string,
  name: string,
  qualification: string
) => {
  return invoke(UPDATE_DOCTOR, { databasePath, name, qualification });
};
