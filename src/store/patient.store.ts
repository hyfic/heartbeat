import create from 'zustand';
import { PatientRawType } from '@/types/patient.type';
import { readPatients } from '@/api/patient.api';

interface PatientStore {
  patients: PatientRawType[];
  page: number;
  error: string | null;
  loadPatients: (databasePath: string, page: number) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  page: 1,
  error: null,
  loadPatients(databasePath, page) {
    readPatients(databasePath, page)
      .then((data) => {
        set({
          error: null, // to disable error if there was any previous errors
          patients: data,
          page, // tracking which page is loaded
        });
      })
      .catch((err) => {
        set({ error: err });
      });
  },
}));
