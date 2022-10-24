import React, { useState } from 'react';
import moment from 'moment';
import { useRecordStore } from '@/store/record.store';
import { MantineProvider } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

export const ScheduleAppointment: React.FC = () => {
  const { nextAppointment, setNextAppointment, loading } = useRecordStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode } = useColorMode();

  const [appointmentDate, setAppointmentDate] = useState<Date | null>(
    nextAppointment ? new Date(nextAppointment) : null
  );

  const scheduleAppointment = () => {
    setNextAppointment(appointmentDate?.getTime().toString() || '');
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
