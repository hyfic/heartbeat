import React, { useContext } from 'react';
import Logo from '../../../../logo.svg';
import moment from 'moment';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import {
  DoctorContext,
  DoctorContextType,
} from '../../../../context/DoctorContext';

export const WaterMark: React.FC = () => {
  const { doctor } = useContext(DoctorContext) as DoctorContextType;

  return (
    <Flex alignItems='center' justifyContent='space-between'>
      {doctor?.name || doctor?.qualification ? (
        <Flex direction='column'>
          <Text fontSize='lg' fontWeight='medium'>
            {doctor.name}
          </Text>
          <Text>{doctor.qualification}</Text>
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
