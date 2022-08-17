import { createContext, useEffect, useState } from 'react';
import { PatientType } from '../types/patient';
import { ReactComponent, SetState } from '../types/react';

export interface PatientContextType {
  patients: PatientType[];
  setPatients: SetState<PatientType[]>;
  appointedPatients: PatientType[];
  setAppointedPatients: SetState<PatientType[]>;
  loading: boolean;
  setLoading: SetState<boolean>;
}

export const PatientContext = createContext<PatientContextType | null>(null);

export const PatientContextWrapper: ReactComponent = ({ children }) => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [appointedPatients, setAppointedPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <PatientContext.Provider
      value={{
        patients,
        setPatients,
        appointedPatients,
        setAppointedPatients,
        loading,
        setLoading,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
