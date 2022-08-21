import React from 'react';
import { PatientDataType } from '../../types/patient';
import { Avatar, Flex, IconButton, Text, useColorMode } from '@chakra-ui/react';
import {
  ExternalLink,
  FileX,
  File,
  Files,
  CalendarOff,
  CalendarEvent,
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Paths } from '../../utils/paths';
import moment from 'moment';

interface Props {
  patient: PatientDataType;
  patientId: number;
}

export const PatientOverview: React.FC<Props> = ({ patient, patientId }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      p={3}
      background={colorMode == 'dark' ? 'gray.700' : 'gray.50'}
      className='rounded'
      direction='column'
    >
      <Flex w='full' justifyContent='space-between' alignItems='center'>
        <Flex alignItems='center'>
          <Avatar name={patient.bioData?.name} size='sm' mr='2' />
          <Text fontWeight='medium'>{patient.bioData?.name}</Text>
        </Flex>
        <Link to={`${Paths.patient}/${patientId}`} replace>
          <IconButton
            aria-label='view patient'
            icon={<ExternalLink size={18} />}
            variant='ghost'
          />
        </Link>
      </Flex>
      <Flex alignItems='center' mt={2} opacity={0.9}>
        {(!patient.records || patient.records.length === 0) && (
          <>
            <FileX />
            <Text ml={1}>No records</Text>
          </>
        )}
        {patient.records && patient.records.length === 1 && (
          <>
            <File />
            <Text ml={1}>1 record</Text>
          </>
        )}
        {patient.records && patient.records.length > 1 && (
          <>
            <Files />
            <Text ml={1}>{patient.records.length} records</Text>
          </>
        )}
      </Flex>
      <Flex ml={0.5} alignItems='center' mt={2} opacity={0.9}>
        {(!patient.records || !patient.records[0].nextAppointment) && (
          <>
            <CalendarOff size={20} />
            <Text ml={1}>No appointment</Text>
          </>
        )}
        {patient.records &&
          patient.records.length !== 0 &&
          patient.records[0].nextAppointment &&
          (moment(patient.records[0].nextAppointment).isAfter() ||
            moment(patient.records[0].nextAppointment).isSame(
              moment(),
              'day'
            )) && (
            <>
              <CalendarEvent size={20} />
              <Text ml={1}>
                {moment(patient.records[0].nextAppointment).format(
                  'dddd, MMM D YYYY'
                )}
              </Text>
            </>
          )}
      </Flex>
    </Flex>
  );
};
