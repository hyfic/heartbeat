import React, { useContext, useState } from 'react';
import { RecordForm } from './RecordForm';
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
} from '@chakra-ui/react';
import { PatientDataType, PatientRecordType } from '../../../types/patient';
import { SetState } from '../../../types/react';
import { updatePatientHelper } from '../../../api/patient';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../../context/DatabaseContext';
import {
  PatientContext,
  PatientContextType,
} from '../../../context/PatientContext';
import { PreviewButton } from './PreviewButton';

interface Props {
  patientData: PatientDataType;
  setPatientData: SetState<PatientDataType>;
  patientId: number;
}

export const NewRecordButton: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
}) => {
  const { editPatient } = useContext(PatientContext) as PatientContextType;
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const btnRef = React.useRef<any>();

  let lastMedicalRecord = patientData?.records
    ? patientData.records.length != 0
      ? patientData.records[0]
      : undefined
    : undefined;

  const [record, setRecord] = useState<PatientRecordType>(
    lastMedicalRecord
      ? {
          medicalBioData: {
            height: lastMedicalRecord?.medicalBioData?.height || undefined,
            weight: lastMedicalRecord?.medicalBioData?.weight || undefined,
            bmi: lastMedicalRecord?.medicalBioData?.bmi || undefined,
          },
          examination: {
            systemicExamination: {
              diagnosis:
                lastMedicalRecord?.examination?.systemicExamination?.diagnosis,
            },
          },
        }
      : {}
  );
  const [loading, setLoading] = useState(false);

  const closeDrawer = () => {
    setRecord({});
    onClose();
  };

  const saveRecord = () => {
    if (!selectedDatabase) return;

    let patientRecords = patientData.records || [];

    patientRecords.unshift({
      ...record,
      createdAt: Date.now(),
    });

    let patientUpdatedData: PatientDataType = {
      ...patientData,
      records: patientRecords,
      updatedAt: Date.now(),
    };

    updatePatientHelper(
      selectedDatabase?.path,
      patientId,
      JSON.stringify(patientUpdatedData)
    )
      .then(() => {
        toast({
          title: 'Added record successfully',
          description: 'Latest changes in database',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        editPatient(patientId, patientUpdatedData);

        setPatientData(patientUpdatedData);
        closeDrawer();
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Please try again or report this as bug',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} ml={1}>
        Add record
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='full'
        onClose={closeDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new record</DrawerHeader>

          <DrawerBody>
            <RecordForm
              patientRecord={record}
              setPatientRecord={setRecord}
              loading={loading}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={closeDrawer}>
              Cancel
            </Button>
            <PreviewButton
              patientCreatedAt={patientData.createdAt || 0}
              patientBioData={patientData.bioData || {}}
              patientRecord={record}
              useButton
            />
            <Button ml={3} colorScheme='blue' onClick={saveRecord}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
