import React, { useState } from 'react';
import moment from 'moment';
import { PatientDataType, PatientType } from '../../types/patient';
import { TextInput } from '../common/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, UserPlus } from 'tabler-icons-react';
import { Paths } from '../../utils/paths';
import { getId } from '../../utils/getId';
import { OpenPatient } from './OpenPatient';
import {
  Flex,
  IconButton,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

interface Props {
  patients: PatientType[];
}

export const PatientList: React.FC<Props> = ({ patients }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Flex mt={5} alignItems='center' justifyContent='space-between'>
        <TextInput
          title='Search..'
          disableTitle
          value={searchQuery}
          setValue={setSearchQuery}
          className='w-full'
        />
        <Link to={Paths.newPatient} replace>
          <Button ml={1}>
            <UserPlus size={18} className='mr-1' /> New patient
          </Button>
        </Link>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<ChevronDown size={18} />}
            ml={1}
          />
          <MenuList>
            <Link to={Paths.newPatient} replace>
              <MenuItem icon={<UserPlus size={18} />}>New patient</MenuItem>
            </Link>
            <OpenPatient />
          </MenuList>
        </Menu>
      </Flex>
      <TableContainer mt={5}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>ID</Th>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Last updated</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients
              .filter((patientJSON) => {
                let patient: PatientDataType = JSON.parse(patientJSON.data);
                return (
                  patient.bioData?.name
                    ?.trim()
                    .toLowerCase()
                    ?.includes(searchQuery.trim().toLowerCase()) ||
                  getId(patient.createdAt || 0).includes(
                    searchQuery.trim().toLowerCase()
                  )
                );
              })
              .map((patientJSON, idx) => {
                let patient: PatientDataType = JSON.parse(patientJSON.data);

                return (
                  <Tr
                    key={idx}
                    className='cursor-pointer duration-200 transition-all hover:opacity-70'
                    onClick={() =>
                      navigate(
                        `${Paths.patient}/${patientJSON.id}?path=${window.location.pathname}`,
                        { replace: true }
                      )
                    }
                  >
                    <Td>{idx + 1}</Td>
                    <Td>{getId(patient.createdAt || 0)}</Td>
                    <Td>
                      <Avatar name={patient.bioData?.name} size='sm' />
                    </Td>
                    <Td>{patient.bioData?.name}</Td>
                    <Td>{patient.bioData?.phone || 'Not added'}</Td>
                    <Td>{moment(patient.updatedAt || 0).fromNow()}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
