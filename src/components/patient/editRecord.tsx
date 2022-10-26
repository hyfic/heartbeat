import React from 'react';
import { useDatabaseStore } from '@/store/database.store';
import { useRecordStore } from '@/store/record.store';
import { useIndividualPatientStore } from '@/store/patient.store';
import { PatientType } from '@/types/patient.type';
import { Edit } from 'tabler-icons-react';
import { RecordForm } from './recordForm';
import { defaultRecordData } from '@/utils/record';
import { PreviewRecord } from './previewRecord';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  recordCreatedAt: string;
}

export const EditRecord: React.FC<Props> = ({ recordCreatedAt }) => {
  const { selectedDatabase } = useDatabaseStore();
  const { record, setRecord, saveRecord, loading } = useRecordStore();
  const { patient, setPatient } = useIndividualPatientStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();

  const openRecordForm = () => {
    if (!patient || (patient && patient.records.length === 0)) return;

    // load record data and set to record store
    let selectedRecord = patient.records.filter(
      (record) => record.createdAt === recordCreatedAt // gives a array with selected record
    );

    if (selectedRecord.length === 0) return; // just in case
    setRecord(selectedRecord[0]);

    onOpen();
  };

  const closeDrawerHandler = () => {
    onClose();
    setRecord(defaultRecordData);
  };

  const saveRecordHandler = () => {
    if (!selectedDatabase || !patient || !record) return;

    let records = patient.records.map((rec) => {
      if (rec.createdAt === recordCreatedAt) {
        return record;
      }

      return rec;
    });

    let patientData: PatientType = {
      ...patient,
      records,
      // re assigning appointment
      appointment:
        record.appointment ||
        (patient.records.length > 0 && patient.records[0].appointment) ||
        '',
    };

    saveRecord(selectedDatabase.path, patientData, () => {
      setPatient(patientData);
      closeDrawerHandler();
    });
  };

  return (
    <>
      <IconButton
        aria-label='edit'
        variant='ghost'
        colorScheme='blue'
        icon={<Edit size={18} strokeWidth={2} />}
        onClick={openRecordForm}
      />

      <Drawer
        isOpen={isOpen}
        placement='right'
        size='full'
        onClose={closeDrawerHandler}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton disabled={loading} />
          <DrawerHeader>Edit record</DrawerHeader>

          <DrawerBody>
            <RecordForm />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={closeDrawerHandler}
              disabled={loading}
            >
              Cancel
            </Button>
            <PreviewRecord record={record} useButton />
            <Button
              ml={3}
              colorScheme='blue'
              onClick={saveRecordHandler}
              isLoading={loading}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
