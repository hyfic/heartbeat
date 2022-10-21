import create from 'zustand';
import { showToast } from '@/utils/showToast';
import { addDoctor, readDoctor, updateDoctor } from '@/api/doctor.api';

interface DoctorStore {
  name: string;
  qualification: string;
  loading: boolean;
  loadData: (databasePath: string) => void;
  addData: (databasePath: string, name: string, qualification: string) => void;
  editData: (databasePath: string, name: string, qualification: string) => void;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
  name: '',
  qualification: '',
  loading: false,
  loadData(databasePath) {
    set({ loading: true });
    readDoctor(databasePath)
      .then((data) => {
        set({
          name: data?.name || '',
          qualification: data?.qualification || '',
        }); // set name and qualification of saved data
      })
      .catch((err) => {
        showToast({
          title: err,
          status: 'error',
        });
      })
      .finally(() => set({ loading: false }));
  },
  // adding doctor data if table does not exist
  addData(databasePath, name, qualification) {
    set({ loading: true });
    addDoctor(databasePath, name, qualification)
      .then(() => {
        set({ name, qualification });
      })
      .catch((err) => {
        showToast({
          title: err,
          status: 'error',
        });
      })
      .finally(() => set({ loading: false }));
  },
  editData(databasePath, name, qualification) {
    set({ loading: true });
    // updating data in doctor table
    updateDoctor(databasePath, name, qualification)
      .then(() => {
        set({ name, qualification });
      })
      .catch((err) => {
        showToast({
          title: err,
          status: 'error',
        });
      })
      .finally(() => set({ loading: false }));
  },
}));
