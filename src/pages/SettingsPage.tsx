import { Select, useColorMode } from '@chakra-ui/react';
import React from 'react';

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
    </div>
  );
};
