import React, { useState } from 'react';
import { ChevronDown, DotsVertical, FilePlus } from 'tabler-icons-react';
import { EditButton } from '@/components/databaseSettings/editButton';
import { DeleteButton } from '@/components/databaseSettings/deleteButton';
import { CreateDatabaseWrapper } from '@/components/navbar/createDatabaseWrapper';
import { OpenFileFolder } from '@/components/databaseSettings/openFileFolder';
import { OpenDatabase } from '@/components/navbar/openDatabase';
import { useDatabaseStore } from '@/store/database.store';
import {
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const DatabaseSettingsPage: React.FC = () => {
  const { databases } = useDatabaseStore();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <h1 className='text-2xl font-medium'>Database settings</h1>
      <Flex mt={5} alignItems='center'>
        <Input
          variant='filled'
          placeholder='Search..'
          w='full'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CreateDatabaseWrapper>
          <Button ml={1}>
            <FilePlus size={20} className='mr-1' /> New database
          </Button>
        </CreateDatabaseWrapper>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<ChevronDown size={18} />}
            ml={1}
          />
          <MenuList>
            <CreateDatabaseWrapper>
              <MenuItem icon={<FilePlus />}>Create database</MenuItem>
            </CreateDatabaseWrapper>
            <OpenDatabase />
          </MenuList>
        </Menu>
      </Flex>
      {databases.length === 0 && <p className='mt-3'>No databases</p>}
      {databases.length !== 0 && (
        <TableContainer mt={5}>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Index</Th>
                <Th>Database name</Th>
                <Th>Path</Th>
                <Th>Options</Th>
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
                      <Menu>
                        <MenuButton>
                          <IconButton
                            aria-label='Options'
                            icon={<DotsVertical size={18} />}
                            variant='ghost'
                          />
                        </MenuButton>
                        <MenuList>
                          <OpenFileFolder databasePath={db.path} />
                          <EditButton db={db} />
                          <DeleteButton db={db} />
                        </MenuList>
                      </Menu>
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
