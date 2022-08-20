import React from 'react';
import { Flex, IconButton, Select } from '@chakra-ui/react';
import { SetState } from '../../../types/react';
import { Printer, X } from 'tabler-icons-react';

interface Props {
  printContent: any;
  printLoading: boolean;
  tableVariant: string;
  setTableVariant: SetState<string>;
  onClose?: any;
}

export const Header: React.FC<Props> = ({
  printContent,
  printLoading,
  tableVariant,
  setTableVariant,
  onClose,
}) => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <h1 className='text-2xl font-medium'>Preview</h1>
      <Flex alignItems='center'>
        <Select
          value={tableVariant}
          onChange={(e) => setTableVariant(e.target.value)}
          mr={2}
          variant='filled'
        >
          <option value='striped'>Striped</option>
          <option value='simple'>Simple</option>
          <option value='unstyled'>Un-styled</option>
        </Select>
        <IconButton
          aria-label='print'
          icon={<Printer size={18} />}
          size='md'
          mr={2}
          colorScheme='teal'
          onClick={printContent}
          isLoading={printLoading}
        />
        <IconButton
          aria-label='close'
          icon={<X size={18} />}
          size='md'
          disabled={printLoading}
          onClick={onClose}
        />
      </Flex>
    </Flex>
  );
};
