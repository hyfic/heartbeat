import React from 'react';
import HyficLogo from '../hyfic_logo.svg';
import {
  Divider,
  Flex,
  Link,
  Select,
  Text,
  useColorMode,
} from '@chakra-ui/react';

export const SettingsPage: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <div>
      <h1 className='text-2xl font-medium'>Settings</h1>
      <div className='mt-5 w-fit'>
        <h2 className='font-medium text-lg'>Appearance</h2>
        <Select
          mt={3}
          variant='filled'
          value={colorMode}
          onChange={(e) => setColorMode(e.target.value)}
        >
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
        </Select>
      </div>
      <Divider mt={10} mb={5} />
      <Flex alignItems='center' justifyContent='space-between'>
        <Text className='ml-1'>
          <Link
            opacity={0.4}
            href='https://hyfic.github.io/heartbeat'
            target='_blank'
            className='hover:opacity-100'
          >
            HeartBeat
          </Link>{' '}
          <span className='opacity-40'>v1.0.0</span>
        </Text>
        <Link href='https://hyfic.github.io' target='_blank'>
          <img
            src={HyficLogo}
            alt='Hyfic'
            className='w-12 opacity-40 hover:opacity-100'
          />
        </Link>
      </Flex>
    </div>
  );
};
