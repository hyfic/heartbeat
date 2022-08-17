import React, { useEffect, useState } from 'react';
import { readDatabasesHelper } from '../api/database';
import { DatabaseType } from '../types/database';
import { FilePlus } from 'tabler-icons-react';
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
  useToast,
} from '@chakra-ui/react';
import { EditButton } from '../components/databaseSettings/EditButton';
import { DeleteButton } from '../components/databaseSettings/DeleteButton';

export const DatabaseSettingsPage: React.FC = () => {
  const toast = useToast();

  const [databases, setDatabases] = useState<DatabaseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    readDatabasesHelper()
      .then((data: any) => {
        setDatabases(data);
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Try running this application as administrator',
          position: 'top-right',
          isClosable: true,
          duration: 3000,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-medium'>Database settings</h1>
      {loading && <p className='mt-5'>Loading...</p>}
      <Flex mt={5} alignItems='center'>
        <Input
          size='lg'
          variant='filled'
          placeholder='Search..'
          w='full'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton
          aria-label='New database'
          icon={<FilePlus />}
          size='lg'
          ml={2}
          colorScheme='teal'
        />
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
