import { ReactComponent } from '../types/react';
import { Flex, useColorMode } from '@chakra-ui/react';
import { Navbar } from './navbar';

export const AppLayout: ReactComponent = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex>
      <Flex
        direction='column'
        className='p-3 w-72 h-screen'
        background={colorMode == 'dark' ? 'gray.700' : 'gray.50'}
      >
        <Navbar />
      </Flex>
      <div className='px-5 py-3 w-full h-screen overflow-y-scroll'>
        {children}
      </div>
    </Flex>
  );
};
