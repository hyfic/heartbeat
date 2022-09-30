import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import '../App.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
