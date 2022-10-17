import React, { useEffect, useState } from 'react';
import { useDatabaseStore } from '@/store/database.store';
import { CreateDatabaseWrapper } from './createDatabaseWrapper';
import { Link } from 'react-router-dom';
import { OpenDatabase } from './openDatabase';
import { Paths } from '@/utils/paths';
import { ChevronDown, FilePlus, FileSettings } from 'tabler-icons-react';
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
  const { selectedDatabase, databases, loadDatabases, setSelectedDatabase } =
    useDatabaseStore();

  const [menuPlaceholder, setMenuPlaceholder] = useState(
    'No database selected'
  );

  useEffect(loadDatabases, []);

  useEffect(() => {
    if (!selectedDatabase) {
      // select first element of databases if there is no selected database
      if (databases.length === 0) {
        setMenuPlaceholder('No database selected');
        return;
      }

      setSelectedDatabase(databases[0]);
      return;
    }

    setMenuPlaceholder(selectedDatabase.name);
  }, [selectedDatabase, databases]);

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
            <CreateDatabaseWrapper>
              <MenuItem icon={<FilePlus />}>Create database</MenuItem>
            </CreateDatabaseWrapper>
            <OpenDatabase />
            <Link to={Paths.databaseSettings} replace>
              <MenuItem icon={<FileSettings />}>Database settings</MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
