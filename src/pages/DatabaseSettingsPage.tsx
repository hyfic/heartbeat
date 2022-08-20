import React, { useContext, useState } from 'react';
import { FilePlus } from 'tabler-icons-react';
import { EditButton } from '../components/databaseSettings/EditButton';
import { DeleteButton } from '../components/databaseSettings/DeleteButton';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../context/DatabaseContext';
import {
  Flex,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CreateDatabaseWrapper } from '../components/navbar/CreateDatabaseWrapper';

export const DatabaseSettingsPage: React.FC = () => {
  const { databases, setDatabases, loading } = useContext(
    DatabaseContext
  ) as DatabaseContextType;

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <h1 className='text-2xl font-medium'>Database settings</h1>
      {loading && <p className='mt-5'>Loading...</p>}
      <Flex mt={5} alignItems='center'>
        <Input
          variant='filled'
          placeholder='Search..'
          w='full'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CreateDatabaseWrapper>
          <IconButton
            aria-label='New database'
            icon={<FilePlus size={20} />}
            ml={2}
          />
        </CreateDatabaseWrapper>
      </Flex>
      {!loading && databases.length === 0 && (
        <p className='mt-3'>No databases</p>
      )}
      {databases.length !== 0 && (
        <TableContainer mt={5}>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Index</Th>
                <Th>Database name</Th>
                <Th>Path</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {databases
                .filter((db) =>
                  db.name
                    .trim()
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
                )
                .map((db, idx) => (
                  <Tr key={db.id}>
                    <Td>{idx + 1}</Td>
                    <Td>{db.name}</Td>
                    <Td>{db.path}</Td>
                    <Td>
                      <EditButton db={db} setDatabases={setDatabases} />
                    </Td>
                    <Td>
                      <DeleteButton db={db} setDatabases={setDatabases} />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
