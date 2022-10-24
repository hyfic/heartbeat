// to store currently editing record data

import create from 'zustand';
import { PatientRecordType } from '@/types/patient.type';
import { defaultRecordData } from '@/utils/record';

interface RecordStore {
  record: PatientRecordType;
  nextAppointment: string;
  loading: boolean;
  setRecord: (record: PatientRecordType) => void;
  setNextAppointment: (nextAppointment: string) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  record: defaultRecordData,
  nextAppointment: '',
  loading: false,
  setRecord: (record) => set({ record }),
  setNextAppointment: (nextAppointment) => set({ nextAppointment }),
}));
