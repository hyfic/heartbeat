import React, { useContext, useEffect, useState } from 'react';
import {
  ChevronDown,
  FileDatabase,
  FilePlus,
  FileSettings,
} from 'tabler-icons-react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Paths } from '../../utils/paths';
import { CreateDatabaseWrapper } from './CreateDatabaseWrapper';
import {
  DatabaseContext,
  DatabaseContextType,
} from '../../context/DatabaseContext';

export const DatabaseOptions: React.FC = () => {
  const { databases, selectedDatabase, setSelectedDatabase, loadDatabases } =
    useContext(DatabaseContext) as DatabaseContextType;

  const [menuPlaceholder, setMenuPlaceholder] = useState(
    'No database selected'
  );

  useEffect(loadDatabases, []);

  useEffect(() => {
    if (!selectedDatabase) {
      setMenuPlaceholder('Select a database');
      return;
    }

    setMenuPlaceholder(selectedDatabase.name);
  }, [selectedDatabase]);

  useEffect(() => {
    // set selected database id to localstorage
    if (!selectedDatabase) return;
    localStorage.setItem(
      'selectedDatabaseId',
      JSON.stringify(selectedDatabase.id)
    );
  }, [selectedDatabase]);

  return (
    <div>
      <Menu>
        <MenuButton
          w='full'
          textAlign='left'
          as={Button}
          rightIcon={<ChevronDown />}
        >
          {menuPlaceholder}
        </MenuButton>
        <MenuList>
          {databases.length !== 0 && (
            <MenuGroup title='Database'>
              <div
                className={databases.length > 5 ? 'h-52 overflow-y-scroll' : ''}
              >
                {databases.map((db) => (
                  <MenuItem
                    key={db.id}
                    onClick={() => {
                      setSelectedDatabase(db);
                      setMenuPlaceholder(db.name);
                    }}
                  >
                    {db.name}
                  </MenuItem>
                ))}
              </div>
            </MenuGroup>
          )}
          {databases.length !== 0 && <MenuDivider />}
          <MenuGroup title='Options'>
            <CreateDatabaseWrapper loadAndSetDatabases={loadDatabases}>
              <MenuItem icon={<FilePlus />}>Create database</MenuItem>
            </CreateDatabaseWrapper>
            <MenuItem icon={<FileDatabase />}>Open database</MenuItem>
            <Link to={Paths.databaseSettings}>
              <MenuItem icon={<FileSettings />}>Database settings</MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
