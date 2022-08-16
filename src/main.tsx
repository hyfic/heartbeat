import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ChakraWrapper } from './components/ChakraWrap';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraWrapper>
      <App />
    </ChakraWrapper>
  </React.StrictMode>
);
