import create from 'zustand';
import { PatientRawType } from '@/types/patient.type';
import { getAppointments, getAppointmentsCount } from '@/api/patient.api';

interface AppointmentStore {
  appointments: PatientRawType[];
  totalAppointments: number;
  page: number;
  error: string | null;
  loading: boolean;
  loadAppointmentsCount: (databasePath: string) => void;
  loadAppointments: (databasePath: string, page: number) => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  totalAppointments: 0,
  page: 1,
  error: null,
  loading: false,
  loadAppointmentsCount(databasePath) {
    set({ loading: true });
    getAppointmentsCount(databasePath)
      .then((count) => {
        set({ totalAppointments: count, loading: false, error: null });
      })
      .catch((err) => {
        set({ error: err, loading: false });
      });
  },
  loadAppointments(databasePath, page) {
    set({ loading: true });
    getAppointments(databasePath, page)
      .then((data) => {
        set({
          error: null,
          appointments: data,
          page,
          loading: false,
        });
      })
      .catch((err) => {
        set({
          error: err,
          loading: false,
        });
      });
  },
}));
