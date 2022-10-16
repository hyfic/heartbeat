import { ReactComponent } from '@/types/react.type';
import { Flex, useColorMode } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  page: string;
  className?: string;
}

export const Navigation: ReactComponent<Props> = ({
  page,
  className,
  children,
}) => {
  const location = useLocation();
  const { colorMode } = useColorMode();

  const onPage = location.pathname === page; // check if user is on provided page

  return (
    <Link to={page}>
      <Flex
        py={2}
        px={4}
        mt={1}
        alignItems='center'
        background={
          onPage ? (colorMode == 'light' ? 'gray.100' : 'whiteAlpha.200') : ''
        }
        className={`rounded flex items-center cursor-pointer font-medium ${
          !onPage
            ? 'opacity-80 transition-all duration-100 hover:opacity-100'
            : ''
        } ${className}`}
      >
        {children}
      </Flex>
    </Link>
  );
};
