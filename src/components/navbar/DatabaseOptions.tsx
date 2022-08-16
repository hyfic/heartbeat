import React, { useEffect, useState } from 'react';
import { DatabaseType } from '../../types/database';
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

export const DatabaseOptions: React.FC = () => {
  const [databases, setDatabases] = useState<DatabaseType[]>([]);
  const [selectedDatabasePath, setSelectedDatabasePath] = useState(
    localStorage.getItem('selectedDatabasePath') || ''
  );
  const [menuPlaceholder, setMenuPlaceholder] = useState('Select a database');

  useEffect(() => {
    // load databases
    setDatabases([
      {
        id: 1,
        name: "Johns's db",
        path: 'john.db',
      },
      {
        id: 2,
        name: "Janes's db",
        path: 'janes.db',
      },
      {
        id: 3,
        name: 'Mike db',
        path: 'mike.db',
      },
    ]);
  }, []);

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
            </MenuGroup>
          )}
          {databases.length !== 0 && <MenuDivider />}
          <MenuGroup title='Options'>
            <MenuItem icon={<FilePlus />}>Create database</MenuItem>
            <MenuItem icon={<FileDatabase />}>Open database</MenuItem>
            <MenuItem icon={<Settings />}>Database settings</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
