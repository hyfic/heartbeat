import { filter, useToast } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { readPatientsHelper } from '../api/patient';
import { PatientDataType, PatientType } from '../types/patient';
import { ReactComponent, SetState } from '../types/react';
import { DatabaseContext, DatabaseContextType } from './DatabaseContext';

export interface PatientContextType {
  patients: PatientType[];
  setPatients: SetState<PatientType[]>;
  appointedPatients: PatientType[];
  setAppointedPatients: SetState<PatientType[]>;
  loading: boolean;
  setLoading: SetState<boolean>;
  loadPatients: () => void;
  loadPatient: (patientId: number) => Promise<PatientType>;
  editPatient: (patientId: number, patientData: PatientDataType) => void;
  deletePatient: (patientId: number) => void;
}

export const PatientContext = createContext<PatientContextType | null>(null);

export const PatientContextWrapper: ReactComponent = ({ children }) => {
  const toast = useToast();

  const [patients, setPatients] = useState<PatientType[]>([]);
  const [appointedPatients, setAppointedPatients] = useState<PatientType[]>([]);
  const [loading, setLoading] = useState(false);

  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const loadPatients = () => {
    if (!selectedDatabase) return;

    setLoading(true);

    readPatientsHelper(selectedDatabase.path)
      .then((rawData: any) => {
        var data: PatientType[] = rawData;

        setPatients(
          data.sort(function (a, b) {
            let aParsed: PatientDataType = JSON.parse(a.data);
            let bParsed: PatientDataType = JSON.parse(b.data);

            let aDate =
              (aParsed.records != undefined
                ? aParsed.records[0].createdAt
                : aParsed.createdAt) || 1;

            let bDate =
              (bParsed.records != undefined
                ? bParsed.records[0].createdAt
                : bParsed.createdAt) || 2;

            return bDate - aDate;
          })
        );
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Try running this application as administrator',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadPatient = (patientId: number) => {
    return new Promise<PatientType>((resolve, reject) => {
      let filteredPatients = patients.filter(
        (patient) => patient.id === patientId
      );

      if (filteredPatients.length !== 0) {
        resolve(filteredPatients[0]);
      } else {
        reject();
        toast({
          title: 'Failed to find patient',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
      }
    });
  };

  const editPatient = (patientId: number, patientData: PatientDataType) => {
    let newPatient: PatientType = {
      id: patientId,
      data: JSON.stringify(patientData),
    };

    let editedPatients = patients.map((patient) =>
      patient.id == patientId ? newPatient : patient
    );

    setPatients(editedPatients);
  };

  const deletePatient = (patientId: number) => {
    let filteredPatients = patients.filter(
      (patient) => patient.id !== patientId
    );
    setPatients(filteredPatients);
  };

  useEffect(loadPatients, [selectedDatabase]);

  useEffect(() => {
    // TODO: set appointed patients
  }, [patients]);

  return (
    <PatientContext.Provider
      value={{
        patients,
        setPatients,
        appointedPatients,
        setAppointedPatients,
        loading,
        setLoading,
        loadPatients,
        loadPatient,
        editPatient,
        deletePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
