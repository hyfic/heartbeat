import { ReactComponent } from '../../types/react';
import { Flex, useColorMode } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  page: string;
  className?: string;
}

export const Navigation: ReactComponent<Props> = ({
  children,
  page,
  className,
}) => {
  const location = useLocation();
  const { colorMode } = useColorMode();

  const selected = location.pathname === page;

  return (
    <Link to={page} replace>
      <Flex
        py={2}
        px={4}
        mt={1}
        alignItems='center'
        background={
          selected ? (colorMode == 'light' ? 'gray.100' : 'whiteAlpha.200') : ''
        }
        className={`rounded flex items-center cursor-pointer font-medium ${
          !selected
            ? 'opacity-80 transition-all duration-100 hover:opacity-100'
            : ''
        } ${className}`}
      >
        {children}
      </Flex>
    </Link>
  );
};
