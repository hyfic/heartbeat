import React, { useContext, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Folder, UserPlus } from 'tabler-icons-react';
import { Paths } from '../utils/paths';
import { DatabaseCheckerWrapper } from '../components/DatabaseCheckerWrapper';
import { PatientContext, PatientContextType } from '../context/PatientContext';
import { TextInput } from '../components/common/TextInput';
import { PatientDataType } from '../types/patient';
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { getId } from '../utils/getId';

export const PatientListPage: React.FC = () => {
  const { loading, patients } = useContext(
    PatientContext
  ) as PatientContextType;

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DatabaseCheckerWrapper>
      <h1 className='text-2xl font-medium'>Patients</h1>
      {loading && <p className='mt-5'>Loading ...</p>}
      <Flex mt={5} alignItems='center' justifyContent='space-between'>
        <TextInput
          title='Search..'
          disableTitle
          value={searchQuery}
          setValue={setSearchQuery}
          className='w-full'
        />
        <Link to={Paths.newPatient}>
          <Button ml={2}>
            <UserPlus size={18} className='mr-2' /> New patient
          </Button>
        </Link>
      </Flex>
      <TableContainer mt={5}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>ID</Th>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Last updated</Th>
              <Th>View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients
              .filter((patientJSON) => {
                let patient: PatientDataType = JSON.parse(patientJSON.data);
                return patient.bioData?.name
                  ?.trim()
                  .toLowerCase()
                  ?.includes(searchQuery.trim().toLowerCase());
              })
              .map((patientJSON, idx) => {
                let patient: PatientDataType = JSON.parse(patientJSON.data);

                return (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{getId(patient.createdAt || 0)}</Td>
                    <Td>
                      <Avatar name={patient.bioData?.name} size='sm' />
                    </Td>
                    <Td>{patient.bioData?.name}</Td>
                    <Td>{moment(patient.updatedAt || 0).fromNow()}</Td>
                    <Td>
                      <Link to={`${Paths.patient}/${patientJSON.id}`}>
                        <IconButton
                          aria-label='View patient'
                          icon={<Folder size={20} />}
                          colorScheme='teal'
                          variant='ghost'
                        />
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </DatabaseCheckerWrapper>
  );
};
