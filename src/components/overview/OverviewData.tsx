import React from 'react';
import { Flex, Text, useColorMode } from '@chakra-ui/react';

interface Props {
  title: string;
  prefix: string;
  affix: any;
}

export const OverviewData: React.FC<Props> = ({ title, prefix, affix }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      direction='column'
      className='rounded p-3 cursor-pointer'
      _hover={{ background: colorMode === 'dark' ? 'gray.700' : 'gray.50' }}
      w='fit-content'
    >
      <Text>{title}</Text>
      <Flex alignItems='end'>
        <h2 className='text-4xl font-bold'>{affix}</h2>
        <Text ml={1}>{prefix}</Text>
      </Flex>
    </Flex>
  );
};
