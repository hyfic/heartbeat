import React from 'react';
import Logo from '@/assets/logo.svg';
import moment from 'moment';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import { useDoctorStore } from '@/store/doctor.store';

export const WaterMark: React.FC = () => {
  const { name, qualification } = useDoctorStore();

  return (
    <Flex alignItems='center' justifyContent='space-between'>
      {name || qualification ? (
        <Flex direction='column'>
          <Text fontSize='lg' fontWeight='medium'>
            {name}
          </Text>
          <Text>{qualification}</Text>
        </Flex>
      ) : (
        <Flex alignItems='center'>
          <Avatar src={Logo} />
          <Flex ml={2} alignItems='center'>
            <Heading className='text-2xl'>Heart</Heading>
            <Heading className='text-2xl' color='teal.400'>
              Beat
            </Heading>
          </Flex>
        </Flex>
      )}
      <Flex direction='column' alignItems='end'>
        <Text>{moment(Date.now()).format('DD/MM/YYYY')}</Text>
        <Text>{moment(Date.now()).format('h:mm A')}</Text>
      </Flex>
    </Flex>
  );
};
