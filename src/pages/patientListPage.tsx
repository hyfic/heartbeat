import React, { useEffect, useState } from 'react';
import { PatientList } from '@/components/patientList';
import { usePatientSearchStore, usePatientStore } from '@/store/patient.store';
import { useDatabaseStore } from '@/store/database.store';
import { DatabaseChecker } from '@/components/databaseChecker';

export const PatientListPage: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();
  const { patients, loadPatients, error, loading, page } = usePatientStore();
  const {
    patients: searchedPatients,
    searchPatients,
    error: searchError,
    loading: searchLoading,
    page: searchPage,
  } = usePatientSearchStore();

  const [searchQuery, setSearchQuery] = useState(''); // to check, whether to display searched patients, or all patients

  const loadListPage = (page: number) => {
    if (!selectedDatabase) return;

    if (searchQuery.trim().length !== 0) {
      searchPatients(selectedDatabase.path, searchQuery, page);
      return;
    }

    loadPatients(selectedDatabase.path, page);
  };

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);

    if (!selectedDatabase) return;
    searchPatients(selectedDatabase.path, searchQuery, 1);
  };

  useEffect(() => {
    loadListPage(1);
  }, [selectedDatabase]);

  return (
    <DatabaseChecker>
      <PatientList
        title='Patients'
        patients={searchQuery.trim().length === 0 ? patients : searchedPatients} // display searched patients if search query is provided, and vice versa
        error={error || searchError}
        loading={loading || searchLoading}
        page={searchQuery.trim().length === 0 ? page : searchPage} // pass patient list page if there is nothing to search
        onSearch={handleSearch}
        loadListPage={loadListPage}
      />
    </DatabaseChecker>
  );
};
