import React, { useContext, useEffect, useState } from 'react';
import {
  ChevronDown,
  FileDatabase,
  FilePlus,
  Settings,
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
  const {
    databases,
    selectedDatabasePath,
    setSelectedDatabasePath,
    loadDatabases,
  } = useContext(DatabaseContext) as DatabaseContextType;

  const [menuPlaceholder, setMenuPlaceholder] = useState(
    'No database selected'
  );

  useEffect(loadDatabases, []);

  useEffect(() => {
    let filteredDatabases = databases.filter(
      (db) => db.path === selectedDatabasePath
    );

    if (filteredDatabases.length === 0) {
      setMenuPlaceholder('Select a database');
      return;
    }

    setMenuPlaceholder(filteredDatabases[0].name);
  }, [databases]);

  useEffect(() => {
    // set selected database to localstorage
    localStorage.setItem('selectedDatabasePath', selectedDatabasePath);
  }, [selectedDatabasePath]);

  return (
    <div>
      <Menu>
        <MenuButton w='full' as={Button} rightIcon={<ChevronDown />}>
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
                      setSelectedDatabasePath(db.path);
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
            <CreateDatabaseWrapper
              loadAndSetDatabases={(databasePath: string) => {
                setSelectedDatabasePath(databasePath);
                loadDatabases();
              }}
            >
              <MenuItem icon={<FilePlus />}>Create database</MenuItem>
            </CreateDatabaseWrapper>
            <MenuItem icon={<FileDatabase />}>Open database</MenuItem>
            <Link to={Paths.databaseSettings}>
              <MenuItem icon={<Settings />}>Database settings</MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
