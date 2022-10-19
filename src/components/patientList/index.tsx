import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/utils/paths';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';
import { PatientBioDataType, PatientRawType } from '@/types/patient.type';
import { ListHeader } from './listHeader';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  title: string;
  patients: PatientRawType[];
  error: string | null;
  loading: boolean;
  page: number;
  onSearch: (searchQuery: string) => void;
  loadListPage: (page: number) => void;
}

export const PatientList: React.FC<Props> = ({
  title,
  patients,
  error,
  loading,
  page,
  onSearch,
  loadListPage,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {!loading && error && (
        <Alert mb={5} status='error'>
          <AlertIcon />
          <AlertTitle>Failed to load patients!</AlertTitle>
          <AlertDescription>Try running app as administrator.</AlertDescription>
        </Alert>
      )}
      <h1 className='text-2xl font-medium'>
        {title} {loading && <Spinner size='sm' />}
      </h1>
      <ListHeader onSearch={onSearch} />
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
            {patients.map((patient, idx) => {
              let patientBioData: PatientBioDataType = JSON.parse(
                patient.bio_data
              );

              return (
                <Tr
                  key={idx}
                  className='cursor-pointer duration-200 transition-all hover:opacity-70'
                  onClick={() => {
                    navigate(`${Paths.patient}/${patient.id}`, {
                      replace: true,
                    });
                  }}
                >
                  <Td>{(page - 1) * 10 + (idx + 1)}</Td>
                  <Td>{patient.pid}</Td>
                  <Td>
                    <Avatar name={patientBioData.name} />
                  </Td>
                  <Td>{patientBioData.name}</Td>
                  <Td>{patientBioData.phone || 'Not added'}</Td>
                  <Td>{moment(Number(patient.updated_at)).fromNow()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack mt={5} direction='row' spacing={2}>
        <Button
          variant='outline'
          leftIcon={<ArrowLeft />}
          disabled={page == 1}
          onClick={() => loadListPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          rightIcon={<ArrowRight />}
          disabled={patients.length < 10}
          onClick={() => loadListPage(page + 1)}
        >
          Next Page
        </Button>
      </Stack>
    </div>
  );
};
