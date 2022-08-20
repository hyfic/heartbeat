import React, { useContext, useState } from 'react';
import { Edit } from 'tabler-icons-react';
import { RecordForm } from './RecordForm';
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
  useToast,
} from '@chakra-ui/react';
import { PatientDataType, PatientRecordType } from '../../../types/patient';
import { SetState } from '../../../types/react';
import {
  PatientContext,
  PatientContextType,
} from '../../../context/PatientContext';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../../context/DatabaseContext';
import { updatePatientHelper } from '../../../api/patient';

interface Props {
  patientId: number;
  patientData: PatientDataType;
  setPatientData: SetState<PatientDataType>;
  recordCreatedAt: number;
}

export const EditRecordButton: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
  recordCreatedAt,
}) => {
  const { editPatient } = useContext(PatientContext) as PatientContextType;
  const { selectedDatabase } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const btnRef = React.useRef<any>();

  const [record, setRecord] = useState<PatientRecordType>(
    patientData.records?.filter((x) => x.createdAt == recordCreatedAt)[0] || {}
  );
  const [loading, setLoading] = useState(false);

  const editRecord = () => {
    if (!selectedDatabase) return;

    setLoading(true);

    let patientRecords = (patientData.records || []).map((patientRecord) => {
      if (patientRecord.createdAt == record.createdAt) {
        return record;
      }

      return patientRecord;
    });

    let patientNewData: PatientDataType = {
      ...patientData,
      records: patientRecords,
      updatedAt: Date.now(),
    };

    updatePatientHelper(
      selectedDatabase.path,
      patientId,
      JSON.stringify(patientNewData)
    )
      .then(() => {
        toast({
          title: 'Edited patient record successfully',
          description: 'Latest changes in database',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        setPatientData(patientNewData);
        onClose();
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
      <IconButton
        aria-label='edit'
        variant='ghost'
        colorScheme='blue'
        icon={<Edit size={18} strokeWidth={2} />}
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement='right'
        size='full'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit record</DrawerHeader>

          <DrawerBody>
            <RecordForm
              patientRecord={record}
              setPatientRecord={setRecord}
              loading={loading}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            {/* <PreviewButton
              patientCreatedAt={patientData.createdAt || 0}
              patientBioData={patientData.bioData || {}}
              patientRecord={record}
              useButton
            /> */}
            <Button ml={3} colorScheme='blue' onClick={editRecord}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
