import React from 'react';
import { useRecordStore } from '@/store/record.store';
import {
  LightMode,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  tableVariant: string;
}

export const Advice: React.FC<Props> = ({ tableVariant }) => {
  const { record } = useRecordStore();

  return record.advice ? (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-3'>ADVICE</h2>
      {record.medicines && record.medicines.length !== 0 && (
        <LightMode>
          <Table mt={2} variant={tableVariant}>
            <Thead>
              <Th>Index</Th>
              <Th>Medicine</Th>
              <Th>Frequency</Th>
              <Th>Time</Th>
              <Th>Duration</Th>
            </Thead>
            <Tbody>
              {record.medicines.map((medicine, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{medicine.medicineName}</Td>
                  <Td>{medicine.frequency}</Td>
                  <Td>{medicine.time}</Td>
                  <Td>{medicine.duration}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </LightMode>
      )}
      {record.advice && (
        <Text mt={2} fontSize='lg'>
          {record.advice}
        </Text>
      )}
      {record.investigationToDo && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>INVESTIGATION TO DO</h2>
          <Text mt={2} fontSize='lg'>
            {record.investigationToDo}
          </Text>
        </div>
      )}
    </div>
  ) : null;
};
