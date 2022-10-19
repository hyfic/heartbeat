import React, { useEffect, useState } from 'react';
import { DatabaseChecker } from '@/components/databaseChecker';
import { useDatabaseStore } from '@/store/database.store';
import { useAppointmentStore } from '@/store/appointment.store';
import { PatientList } from '@/components/patientList';
import { PatientBioDataType } from '@/types/patient.type';

export const AppointedPatientsPage: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();
  const { appointments, loading, error, page, loadAppointments } =
    useAppointmentStore();

  const [searchQuery, setSearchQuery] = useState('');

  const loadListPage = (page: number) => {
    if (!selectedDatabase) return;
    loadAppointments(selectedDatabase.path, page);
  };

  useEffect(() => {
    loadListPage(1);
  }, []);

  return (
    <DatabaseChecker>
      <PatientList
        title='Appointments'
        patients={appointments.filter((patient) => {
          let patientBioData: PatientBioDataType = JSON.parse(patient.bio_data);
          return (
            patientBioData.name
              .trim()
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase()) ||
            patient.pid.includes(searchQuery.trim())
          );
        })}
        error={error}
        loading={loading}
        page={page}
        onSearch={setSearchQuery}
        loadListPage={loadListPage}
      />
    </DatabaseChecker>
  );
};
