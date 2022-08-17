import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Paths } from './utils/paths';

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path={Paths.home} element={<div></div>} />
            <Route path={`${Paths.patient}/:id`} element={<div></div>} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
};
