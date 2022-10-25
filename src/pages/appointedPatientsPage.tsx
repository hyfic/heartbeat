import React, { useEffect, useState } from 'react';
import { DatabaseChecker } from '@/components/databaseChecker';
import { useDatabaseStore } from '@/store/database.store';
import { useAppointmentStore } from '@/store/appointment.store';
import { PatientList } from '@/components/patientList';
import { PatientBioDataType } from '@/types/patient.type';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { getAppointmentsCount } from '@/api/patient.api';
import { getToday, getTomorrow } from '@/utils/time';

export const AppointedPatientsPage: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();
  const { appointments, loading, error, page, loadAppointments } =
    useAppointmentStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [tomorrowCount, setTomorrowCount] = useState(0);

  const loadListPage = (page: number) => {
    if (!selectedDatabase) return;
    loadAppointments(selectedDatabase.path, page, isTomorrow);
  };

  useEffect(() => {
    loadListPage(1);
  }, [isTomorrow, selectedDatabase]);

  useEffect(() => {
    if (!selectedDatabase) return;
    getAppointmentsCount(selectedDatabase.path, getToday(), getToday()).then(
      setTodayCount
    );
    getAppointmentsCount(
      selectedDatabase.path,
      getTomorrow(),
      getTomorrow()
    ).then(setTomorrowCount);
  }, [selectedDatabase]);

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
      >
        <Tabs mt={3}>
          <TabList>
            <Tab onClick={() => setIsTomorrow(false)}>Today ({todayCount})</Tab>
            <Tab onClick={() => setIsTomorrow(true)}>
              Tomorrow ({tomorrowCount})
            </Tab>
          </TabList>
        </Tabs>
      </PatientList>
    </DatabaseChecker>
  );
};
