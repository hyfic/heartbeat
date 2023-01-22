import React from 'react';
import Logo from '../logo.svg';
import { FaGithub } from 'react-icons/fa';
import { Flex, IconButton, Tag, TagLabel } from '@chakra-ui/react';

export const Header: React.FC = () => {
  return (
    <Flex mt={8} alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <img src={Logo} alt='HeartBeat' className='w-9' />
        <h2 className='text-2xl font-bold ml-2'>
          Heart
          <span className='text-teal-400'>Beat</span>
        </h2>
        <Tag ml={2} borderRadius='full'>
          <TagLabel>1.0.0</TagLabel>
        </Tag>
      </Flex>
      <Flex alignItems='center'>
        <a href='https://github.com/hyfic/heartbeat'>
          <IconButton
            aria-label='Github'
            icon={<FaGithub className='text-xl' />}
            variant='ghost'
          />
        </a>
      </Flex>
    </Flex>
  );
};
