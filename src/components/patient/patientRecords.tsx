import React, { useState } from 'react';
import moment from 'moment';
import { TextInput } from '@/components/common/textInput';
import { NewRecord } from './newRecord';
import { useIndividualPatientStore } from '@/store/patient.store';
import { DeleteRecord } from './deleteRecord';
import { EditRecord } from './editRecord';
import { PreviewRecord } from './previewRecord';
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

export const PatientRecords: React.FC = () => {
  const { patient } = useIndividualPatientStore();
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
        <NewRecord />
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
          {patient && (
            <Tbody>
              {patient.records &&
                patient.records
                  .filter((record) => {
                    return moment(Number(record.createdAt))
                      .format('LLLL')
                      .trim()
                      .toLowerCase()
                      .includes(searchQuery.trim().toLowerCase());
                  })
                  .map((record, idx) => (
                    <Tr key={idx}>
                      <Td>{idx + 1}</Td>
                      <Td>{moment(Number(record.createdAt)).format('llll')}</Td>
                      <Td>
                        <EditRecord recordCreatedAt={record.createdAt} />
                      </Td>
                      <Td>
                        <DeleteRecord recordCreatedAt={record.createdAt} />
                      </Td>
                      <Td>
                        <PreviewRecord record={record} />
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};
