import React, { useState } from 'react';
import { PatientDataType } from '../../types/patient';
import { TextInput } from '../common/TextInput';
import { NewRecordButton } from './record/NewRecordButton';
import { SetState } from '../../types/react';
import moment from 'moment';
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { EditRecordButton } from './record/EditRecordButton';

interface Props {
  patientData: PatientDataType;
  setPatientData: SetState<PatientDataType>;
  patientId: number;
}

export const PatientRecords: React.FC<Props> = ({
  patientData,
  setPatientData,
  patientId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Flex mt={5} alignItems='center' justifyContent='space-between'>
        <TextInput
          title='Search records..'
          disableTitle
          value={searchQuery}
          setValue={setSearchQuery}
          className='w-full'
        />
        <NewRecordButton
          patientData={patientData}
          setPatientData={setPatientData}
          patientId={patientId}
        />
      </Flex>
      <TableContainer mt={5}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Created at</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
              <Th>Preview</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patientData.records &&
              patientData.records
                .filter((record) => {
                  return moment(record.createdAt)
                    .format('LLLL')
                    .trim()
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase());
                })
                .map((record, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{moment(record.createdAt).format('llll')}</Td>
                    <Td>
                      <EditRecordButton
                        patientId={patientId}
                        patientData={patientData}
                        setPatientData={setPatientData}
                        recordCreatedAt={record.createdAt || 0}
                      />
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
