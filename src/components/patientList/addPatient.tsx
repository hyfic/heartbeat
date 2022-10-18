import React from 'react';
import { Link } from 'react-router-dom';
import { Paths } from '@/utils/paths';
import { ChevronDown, UserPlus } from 'tabler-icons-react';
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

export const AddPatient: React.FC = () => {
  return (
    <>
      <Link to={Paths.newPatient} replace>
        <Button ml={1}>
          <UserPlus size={18} className='mr-1' /> New patient
        </Button>
      </Link>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<ChevronDown size={18} />}
          ml={1}
        />
        <MenuList>
          <Link to={Paths.newPatient} replace>
            <MenuItem icon={<UserPlus size={18} />}>New patient</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </>
  );
};
