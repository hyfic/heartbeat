import create from 'zustand';
import { PatientRawType } from '@/types/patient.type';
import { readPatients, searchPatients } from '@/api/patient.api';

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

// store to save patient search data
interface PatientSearchStore {
  patients: PatientRawType[];
  page: number;
  error: string | null;
  searchPatients: (
    databasePath: string,
    searchQuery: string,
    page: number
  ) => void;
}

export const usePatientSearchStore = create<PatientSearchStore>((set) => ({
  patients: [],
  page: 1,
  error: null,
  searchPatients(databasePath, searchQuery, page) {
    if (databasePath.trim().length === 0) {
      set({ error: null, patients: [], page: 1 }); // resetting data if nothing is entered on search
      return;
    }

    searchPatients(databasePath, searchQuery, page)
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
