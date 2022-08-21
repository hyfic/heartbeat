import { useToast } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { readDoctorHelper } from '../api/doctor';
import { DoctorType } from '../types/doctor';
import { ReactComponent, SetState } from '../types/react';
import { DatabaseContext, DatabaseContextType } from './DatabaseContext';

export interface DoctorContextType {
  doctor: DoctorType | null;
  setDoctor: SetState<DoctorType | null>;
}

export const DoctorContext = createContext<DoctorContextType | null>(null);

export const DoctorContextWrapper: ReactComponent = ({ children }) => {
  const toast = useToast();

  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const [doctor, setDoctor] = useState<DoctorType | null>(null);

  const loadDoctor = () => {
    if (!selectedDatabase) return;

    readDoctorHelper(selectedDatabase.path)
      .then((doctorRawData: any) => {
        if (doctorRawData.length !== 0) {
          setDoctor(doctorRawData[0]);
        } else {
          setDoctor(null);
        }
      })
      .catch((err) => {
        toast({
          title: err,
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
        setDoctor(null);
      });
  };

  useEffect(loadDoctor, [selectedDatabase]);

  return (
    <DoctorContext.Provider value={{ doctor, setDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};
