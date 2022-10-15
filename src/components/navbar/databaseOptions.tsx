import React, { useEffect, useState } from 'react';
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
import { useDatabaseStore } from '@/store/database.store';
import { CreateDatabaseWrapper } from './createDatabaseWrapper';

export const DatabaseOptions: React.FC = () => {
  const { selectedDatabase, databases, loadDatabases, setSelectedDatabase } =
    useDatabaseStore();

  const [menuPlaceholder, setMenuPlaceholder] = useState(
    'No database selected'
  );

  useEffect(loadDatabases, []);

  useEffect(() => {
    if (!selectedDatabase) {
      setMenuPlaceholder('No database selected');
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
            <CreateDatabaseWrapper>
              <MenuItem icon={<FilePlus />}>Create database</MenuItem>
            </CreateDatabaseWrapper>
            {/* <OpenDatabase />
            <Link to={Paths.databaseSettings} replace>
              <MenuItem icon={<FileSettings />}>Database settings</MenuItem>
            </Link> */}
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
