import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { DatabaseContextWrapper } from './context/DatabaseContext';
import { DatabaseSettingsPage } from './pages/DatabaseSettingsPage';
import { NewPatientPage } from './pages/NewPatientPage';
import { OverviewPage } from './pages/OverviewPage';
import { SettingsPage } from './pages/SettingsPage';
import { Paths } from './utils/paths';

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <DatabaseContextWrapper>
          <AppLayout>
            <Routes>
              <Route path={Paths.overview} element={<OverviewPage />} />
              <Route path={`${Paths.patient}/:id`} element={<div></div>} />
              <Route path={Paths.newPatient} element={<NewPatientPage />} />
              <Route path={Paths.settings} element={<SettingsPage />} />
              <Route
                path={Paths.databaseSettings}
                element={<DatabaseSettingsPage />}
              />
            </Routes>
          </AppLayout>
        </DatabaseContextWrapper>
      </BrowserRouter>
    </div>
  );
};
