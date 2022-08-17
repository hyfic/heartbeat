import { ReactComponent } from '../types/react';
import { Flex, useColorMode } from '@chakra-ui/react';
import { Navbar } from './navbar';

export const AppLayout: ReactComponent = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex>
      <Flex
        direction='column'
        className='p-3 w-72 h-screen'
        background={colorMode == 'dark' ? 'gray.700' : 'gray.50'}
      >
        <Navbar />
        <button className='bg-teal-400 mt-5' onClick={toggleColorMode}>
          toggle theme
        </button>
      </Flex>
      <div className='px-5 py-3 w-full'>{children}</div>
    </Flex>
  );
};
