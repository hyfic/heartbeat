import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { DatabaseContextWrapper } from './context/DatabaseContext';
import { PatientContextWrapper } from './context/PatientContext';
import { DatabaseSettingsPage } from './pages/DatabaseSettingsPage';
import { NewPatientPage } from './pages/NewPatientPage';
import { OverviewPage } from './pages/OverviewPage';
import { PatientListPage } from './pages/PatientListPage';
import { PatientPage } from './pages/PatientPage';
import { SettingsPage } from './pages/SettingsPage';
import { Paths } from './utils/paths';

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <DatabaseContextWrapper>
          <PatientContextWrapper>
            <AppLayout>
              <Routes>
                <Route path={Paths.overview} element={<OverviewPage />} />
                <Route path={Paths.patient} element={<PatientListPage />} />
                <Route
                  path={`${Paths.patient}/:id`}
                  element={<PatientPage />}
                />
                <Route path={Paths.newPatient} element={<NewPatientPage />} />
                <Route path={Paths.settings} element={<SettingsPage />} />
                <Route
                  path={Paths.databaseSettings}
                  element={<DatabaseSettingsPage />}
                />
              </Routes>
            </AppLayout>
          </PatientContextWrapper>
        </DatabaseContextWrapper>
      </BrowserRouter>
    </div>
  );
};
