import React from 'react';
import HyficLogoWhite from '@/assets/hyfic_logo_white.svg';
import HyficLogoBlack from '@/assets/hyfic_logo_black.svg';
import { FileSettings } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Paths } from '@/utils/paths';
import {
  Button,
  Divider,
  Flex,
  Link as ChakraLink,
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
      <div className='mt-5 w-fit'>
        <h2 className='font-medium text-lg'>Database settings</h2>
        <Link to={Paths.databaseSettings} replace>
          <Button mt={3}>
            <FileSettings size={18} className='mr-1' /> Database settings
          </Button>
        </Link>
      </div>
      <Divider mt={10} mb={5} />
      <Flex alignItems='center' justifyContent='space-between'>
        <Text className='ml-1'>
          <ChakraLink
            opacity={0.4}
            href='https://hyfic.github.io/heartbeat'
            target='_blank'
            className='hover:opacity-100'
          >
            HeartBeat
          </ChakraLink>{' '}
          <span className='opacity-40'>v1.0.0</span>
        </Text>
        <ChakraLink href='https://hyfic.github.io' target='_blank'>
          <img
            src={colorMode === 'dark' ? HyficLogoWhite : HyficLogoBlack}
            alt='Hyfic'
            className='w-12 text-red-500 opacity-40 hover:opacity-100'
          />
        </ChakraLink>
      </Flex>
    </div>
  );
};
