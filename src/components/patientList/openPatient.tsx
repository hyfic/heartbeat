import React from 'react';
import { MenuItem } from '@chakra-ui/react';
import { FileImport } from 'tabler-icons-react';
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { PatientType } from '@/types/patient.type';
import { useDatabaseStore } from '@/store/database.store';
import { showToast } from '@/utils/showToast';
import { usePatientStore } from '@/store/patient.store';
import { createNewPatient } from '@/api/patient.api';

export const OpenPatient: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();
  const { loadPatients } = usePatientStore();

  const createPatient = (patientData: PatientType) => {
    if (!selectedDatabase) return;

    createNewPatient(
      selectedDatabase.path,
      patientData.bioData,
      patientData.records,
      patientData.appointment
    )
      .then(() => {
        showToast({
          title: 'Saved patient data successfully',
          description: `${patientData.bioData?.name} is in your list now :)`,
          status: 'success',
        });

        loadPatients(selectedDatabase.path, 1);
      })
      .catch((err) => {
        showToast({
          title: err,
          description: 'Try running this application as administrator',
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
            let patientData: PatientType = JSON.parse(content);

            if (!patientData.bioData?.name) {
              showToast({
                title: 'Invalid format',
                status: 'error',
              });
              return;
            }

            createPatient(patientData);
          })
          .catch(() => {
            showToast({
              title: `Failed to read ${filePath}`,
              status: 'error',
            });
          });
      })
      .catch(() => {
        showToast({
          title: 'Failed to open file',
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
