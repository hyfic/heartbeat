import React from 'react';
import { useIndividualPatientStore } from '@/store/patient.store';
import { useRecordStore } from '@/store/record.store';
import {
  LightMode,
  ListItem,
  OrderedList,
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

export const BioData: React.FC<Props> = ({ tableVariant }) => {
  const { patient } = useIndividualPatientStore();
  const { record } = useRecordStore();

  return patient && record ? (
    <div>
      <h2 className='text-xl font-semibold mb-3'>BIODATA</h2>
      <LightMode>
        <Table variant={tableVariant} fontSize='lg'>
          <Thead fontSize='lg'>
            <Th>Id</Th>
            {patient.bioData.name && <Th>Name</Th>}
            {patient.bioData.age && <Th>Age</Th>}
            {record.height && <Th>Height</Th>}
            {record.weight && <Th>Weight</Th>}
            {record.height && record.weight && <Th>BMI</Th>}
          </Thead>
          <Tbody>
            <Tr>
              <Td>{patient.pid}</Td>
              {patient.bioData.name && <Td>{patient.bioData.name}</Td>}
              {patient.bioData.age && (
                <Td>
                  {patient.bioData.age}{' '}
                  {patient.bioData.sex && ' / ' + patient.bioData.sex[0]}
                </Td>
              )}
              {record.height && (
                <Td>
                  {record.height}
                  {record.heightUnit}
                </Td>
              )}
              {record.weight && <Td>{record.weight}Kg</Td>}
              {record.height && record.weight && <Td>{record.bmi}</Td>}
            </Tr>
          </Tbody>
        </Table>
      </LightMode>
      {patient.bioData.address && (
        <Text mt={3} fontSize='lg'>
          <span className='mr-2'>Address : </span>
          {patient.bioData.address}
        </Text>
      )}
      {record.allergicMedicines && record.allergicMedicines.length > 0 && (
        <Text mt={3} color='red' className='text-lg font-medium'>
          Allergic to medicines
        </Text>
      )}
      {record.allergicMedicines && record.allergicMedicines.length > 0 && (
        <OrderedList mt={2}>
          {record.allergicMedicines.map((medicineName, idx) => (
            <ListItem key={idx} fontSize='lg'>
              {medicineName}
            </ListItem>
          ))}
        </OrderedList>
      )}
      {record.remark && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>REMARKS</h2>
          <Text mt={2} fontSize='lg' className='font-medium'>
            {record.remark.toUpperCase()}
          </Text>
        </div>
      )}
      {record.diagnosis && record.diagnosis.length !== 0 && (
        <div className='mt-3'>
          <h2 className='text-xl font-medium'>DIAGNOSIS</h2>
          <OrderedList mt={2}>
            {record.diagnosis.map((value, idx) => (
              <ListItem key={idx} fontSize='lg'>
                {value}
              </ListItem>
            ))}
          </OrderedList>
        </div>
      )}
      {record.chiefComplaint ||
        record.pastMedicalHistory ||
        record.personalHistory ||
        record.familyHistory ||
        (record.treatmentHistory && (
          <LightMode>
            <Table mt={3} variant={tableVariant}>
              <Tbody>
                {record.chiefComplaint && (
                  <Tr>
                    <Td fontWeight='medium'>CHIEF COMPLAINT</Td>
                    <Td>{record.chiefComplaint}</Td>
                  </Tr>
                )}
                {record.pastMedicalHistory && (
                  <Tr>
                    <Td fontWeight='medium'>PAST MEDICAL HISTORY</Td>
                    <Td>{record.pastMedicalHistory}</Td>
                  </Tr>
                )}
                {record.personalHistory && (
                  <Tr>
                    <Td fontWeight='medium'>PERSONAl HISTORY</Td>
                    <Td>{record.personalHistory}</Td>
                  </Tr>
                )}
                {record.familyHistory && (
                  <Tr>
                    <Td fontWeight='medium'>FAMILY HISTORY</Td>
                    <Td>{record.familyHistory}</Td>
                  </Tr>
                )}
                {record.treatmentHistory && (
                  <Tr>
                    <Td fontWeight='medium'>TREATMENT HISTORY</Td>
                    <Td>{record.treatmentHistory}</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </LightMode>
        ))}
    </div>
  ) : null;
};
