import React, { useEffect, useState } from 'react';
import { DatabaseType } from '../../types/database';
import { ChevronDown, FileDatabase, Settings } from 'tabler-icons-react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../utils/paths';
import { CreateDatabaseButton } from './CreateDatabaseButton';
import { readDatabasesHelper } from '../../api/database';

export const DatabaseOptions: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [databases, setDatabases] = useState<DatabaseType[]>([]);
  const [selectedDatabasePath, setSelectedDatabasePath] = useState(
    localStorage.getItem('selectedDatabasePath') || ''
  );
  const [menuPlaceholder, setMenuPlaceholder] = useState('Select a database');

  const loadAndSetDatabases = (databasePath?: string) => {
    if (databasePath) {
      setSelectedDatabasePath(databasePath);
    }

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
      });
  };

  useEffect(() => {
    // load databases
    loadAndSetDatabases();
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
            <CreateDatabaseButton loadAndSetDatabases={loadAndSetDatabases} />
            <MenuItem icon={<FileDatabase />}>Open database</MenuItem>
            <MenuItem icon={<Settings />}>Database settings</MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
