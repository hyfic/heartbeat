// to store currently editing record data

import create from 'zustand';
import { PatientRecordType, PatientType } from '@/types/patient.type';
import { defaultRecordData } from '@/utils/record';
import { updatePatient } from '@/api/patient.api';
import { showToast } from '@/utils/showToast';

interface RecordStore {
  record: PatientRecordType;
  loading: boolean;
  setRecord: (record: PatientRecordType) => void;
  saveRecord: (
    databasePath: string,
    patientData: PatientType,
    onSuccess: () => void
  ) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  record: defaultRecordData,
  loading: false,
  setRecord: (record) => set({ record }),
  saveRecord(databasePath, patientData, onSuccess) {
    set({ loading: true });
    updatePatient(databasePath, patientData)
      .then(() => {
        showToast({
          title: 'Added record successfully',
          description: 'Latest changes in database',
          status: 'success',
        });
        onSuccess();
      })
      .catch((err) => {
        showToast({
          title: err,
          description: 'Please try again or report this as bug',
          status: 'error',
        });
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));
