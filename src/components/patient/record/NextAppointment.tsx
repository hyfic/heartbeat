import React, { useState } from 'react';
import moment from 'moment';
import { Calendar } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { PatientRecordType } from '../../../types/patient';
import { SetState } from '../../../types/react';

interface Props {
  patientRecord: PatientRecordType;
  setPatientRecord: SetState<PatientRecordType>;
  loading: boolean;
}

export const NextAppointment: React.FC<Props> = ({
  patientRecord,
  setPatientRecord,
  loading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode } = useColorMode();

  const [appointmentDate, setAppointmentDate] = useState<Date | null>(
    patientRecord.nextAppointment
      ? new Date(patientRecord.nextAppointment)
      : null
  );

  const scheduleAppointment = () => {
    let newPatientRecord: PatientRecordType = {
      ...patientRecord,
      nextAppointment: appointmentDate?.getTime(),
    };

    setPatientRecord(newPatientRecord);
    onClose();
  };

  return (
    <>
      <Button disabled={loading} my={5} onClick={onOpen}>
        {appointmentDate
          ? `Scheduled on ${moment(appointmentDate).format('dddd, MMM D YYYY')}`
          : 'Schedule Appointment'}
      </Button>

      <Modal isCentered size='5xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {appointmentDate
              ? moment(appointmentDate).format('dddd, MMM D YYYY')
              : 'Schedule appointment date'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MantineProvider
              theme={{ colorScheme: colorMode }}
              withGlobalStyles
            >
              <Calendar
                value={appointmentDate || new Date()}
                onChange={setAppointmentDate}
                amountOfMonths={3}
                fullWidth
              />
            </MantineProvider>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              variant='ghost'
              mr={3}
              onClick={() => setAppointmentDate(null)}
              disabled={!appointmentDate}
            >
              Clear date
            </Button>
            <Button
              disabled={!appointmentDate}
              colorScheme='teal'
              onClick={scheduleAppointment}
            >
              Fix date
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
