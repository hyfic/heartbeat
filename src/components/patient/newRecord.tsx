import React from 'react';
import { RecordForm } from './recordForm';
import { useRecordStore } from '@/store/record.store';
import { defaultRecordData } from '@/utils/record';
import { useDatabaseStore } from '@/store/database.store';
import { useIndividualPatientStore } from '@/store/patient.store';
import { PatientType } from '@/types/patient.type';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';

export const NewRecord: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();
  const { record, setRecord, saveRecord, loading } = useRecordStore();
  const { patient, setPatient } = useIndividualPatientStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef<any>();

  const closeDrawerHandler = () => {
    onClose();
    setRecord(defaultRecordData);
  };

  const saveRecordHandler = () => {
    if (!selectedDatabase || !patient || !record) return;

    let patientData: PatientType = {
      ...patient,
      appointment:
        record.appointment ||
        (patient.records.length > 0 && patient.records[0].appointment) ||
        '',
      records: [
        { ...record, createdAt: Date.now().toString() },
        ...patient.records,
      ],
    };

    saveRecord(selectedDatabase.path, patientData, () => {
      setPatient(patientData);
      closeDrawerHandler();
    });
  };

  return (
    <>
      <Flex alignItems='center' ml={1}>
        <Button ref={btnRef} onClick={onOpen}>
          Add record
        </Button>
      </Flex>

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
          <DrawerHeader>Create new record</DrawerHeader>

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
