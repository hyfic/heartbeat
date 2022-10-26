import React, { useState } from 'react';
import { Paths } from '@/utils/paths';
import { ChevronDown, UserPlus } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { OpenPatient } from './openPatient';
import {
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

interface Props {
  onSearch: (searchQuery: string) => void;
}

export const ListHeader: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Flex mt={5} alignItems='center' justifyContent='space-between'>
      <Input
        variant='filled'
        placeholder='Search..'
        onChange={(e) => onSearch(e.target.value)}
      />
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
          <OpenPatient />
        </MenuList>
      </Menu>
    </Flex>
  );
};
