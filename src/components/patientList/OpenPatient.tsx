import React, { useContext } from 'react';
import { MenuItem, useToast } from '@chakra-ui/react';
import { FileImport } from 'tabler-icons-react';
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { PatientDataType } from '../../types/patient';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';
import { createPatientHelper } from '../../api/patient';
import {
  PatientContext,
  PatientContextType,
} from '../../context/PatientContext';

export const OpenPatient: React.FC = () => {
  const toast = useToast();
  const { loadPatients } = useContext(PatientContext) as PatientContextType;
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const createPatient = (patientData: PatientDataType) => {
    if (!selectedDatabase) return;

    createPatientHelper(selectedDatabase.path, JSON.stringify(patientData))
      .then(() => {
        toast({
          title: 'Saved patient data successfully',
          description: `${patientData.bioData?.name} is in your list now :)`,
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        loadPatients();
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
      });
  };

  const loadPatient = () => {
    open({
      filters: [
        {
          name: 'Patient',
          extensions: ['json'],
        },
      ],
    })
      .then((filePath) => {
        if (typeof filePath !== 'string') return;
        readTextFile(filePath)
          .then((content) => {
            let patientData: PatientDataType = {
              ...JSON.parse(content),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };

            if (!patientData.bioData?.name) {
              toast({
                title: 'Invalid format',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
                status: 'error',
              });
              return;
            }

            createPatient(patientData);
          })
          .catch(() => {
            toast({
              title: `Failed to read ${filePath}`,
              position: 'top-right',
              isClosable: true,
              duration: 3000,
              status: 'error',
            });
          });
      })
      .catch(() => {
        toast({
          title: 'Failed to open file',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
      });
  };

  return (
    <MenuItem icon={<FileImport size={18} />} onClick={loadPatient}>
      Open patient
    </MenuItem>
  );
};
