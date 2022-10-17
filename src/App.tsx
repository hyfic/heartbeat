import React from 'react';
import { AppLayout } from './components/appLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Paths } from '@/utils/paths';
import { PatientListPage } from '@/pages/patientListPage';
import { PatientPage } from '@/pages/patientPage';
import { AppointedPatientsPage } from '@/pages/appointedPatientsPage';
import { NewPatientPage } from '@/pages/newPatientPage';
import { SettingsPage } from '@/pages/settingsPage';
import { DatabaseSettingsPage } from '@/pages/databaseSettingsPage';
import { DoctorPage } from '@/pages/doctorPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={Paths.patientList} element={<PatientListPage />} />
          <Route path={`${Paths.patient}/:id`} element={<PatientPage />} />
          <Route
            path={Paths.appointments}
            element={<AppointedPatientsPage />}
          />
          <Route path={Paths.newPatient} element={<NewPatientPage />} />
          <Route path={Paths.settings} element={<SettingsPage />} />
          <Route
            path={Paths.databaseSettings}
            element={<DatabaseSettingsPage />}
          />
          <Route path={Paths.doctor} element={<DoctorPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
