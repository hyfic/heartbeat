import React, { useContext, useState } from 'react';
import { RecordForm } from './RecordForm';
import { PatientDataType, PatientRecordType } from '../../../types/patient';
import { SetState } from '../../../types/react';
import { updatePatientHelper } from '../../../api/patient';
import { PreviewButton } from './PreviewButton';
import { ChevronDown } from 'tabler-icons-react';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../../context/DatabaseContext';
import {
  PatientContext,
  PatientContextType,
} from '../../../context/PatientContext';
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
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

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

  let defaultRecordData = lastMedicalRecord
    ? {
        medicalBioData: {
          height: lastMedicalRecord?.medicalBioData?.height || undefined,
          weight: lastMedicalRecord?.medicalBioData?.weight || undefined,
          bmi: lastMedicalRecord?.medicalBioData?.bmi || undefined,
        },
      }
    : {};

  const [record, setRecord] = useState<PatientRecordType>(defaultRecordData);
  const [loading, setLoading] = useState(false);

  const closeDrawer = () => {
    setRecord(defaultRecordData);
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
      <Flex alignItems='center' ml={1}>
        <Button ref={btnRef} onClick={onOpen}>
          Add record
        </Button>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<ChevronDown size={18} />}
            ml={1}
          />
          <MenuList>
            <MenuItem
              onClick={() => {
                setRecord({});
                onOpen();
              }}
            >
              New blank record
            </MenuItem>
            {lastMedicalRecord && (
              <MenuItem
                onClick={() => {
                  setRecord(lastMedicalRecord || {});
                  onOpen();
                }}
              >
                New record with previous data
              </MenuItem>
            )}
            {lastMedicalRecord &&
              lastMedicalRecord.examination?.systemicExamination?.diagnosis &&
              lastMedicalRecord.examination?.systemicExamination?.diagnosis
                .length !== 0 && (
                <MenuItem
                  onClick={() => {
                    setRecord({
                      ...defaultRecordData,
                      examination: {
                        systemicExamination: {
                          diagnosis:
                            lastMedicalRecord?.examination?.systemicExamination
                              ?.diagnosis,
                        },
                      },
                    });
                    onOpen();
                  }}
                >
                  New record with last diagnosis
                </MenuItem>
              )}
          </MenuList>
        </Menu>
      </Flex>
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
