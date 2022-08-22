import React, { useContext, useState } from 'react';
import moment from 'moment';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { PatientList } from '../components/patientList';
import { PatientContext, PatientContextType } from '../context/PatientContext';
import { PatientDataType } from '../types/patient';

enum TabPage {
  Today,
  Tomorrow,
}

export const AppointedPatients: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(TabPage.Today);

  const { appointedPatients } = useContext(
    PatientContext
  ) as PatientContextType;

  const filterPatients = (isTomorrow?: boolean) => {
    return appointedPatients.filter((patient) => {
      let patientData: PatientDataType = JSON.parse(patient.data);
      let nextAppointment =
        patientData.records &&
        patientData.records?.length > 0 &&
        patientData.records[0].nextAppointment
          ? patientData.records[0].nextAppointment
          : null;

      let check = isTomorrow
        ? moment(nextAppointment).isSame(moment().add(1, 'day'), 'day')
        : moment(nextAppointment).isSame(moment(), 'day');

      if (nextAppointment && check) {
        return patient;
      }
    });
  };

  const todaysAppointment = filterPatients();
  const tomorrowsAppointment = filterPatients(true);

  return (
    <div>
      <h1 className='text-2xl font-medium'>Appointments</h1>
      <Tabs mt={5}>
        <TabList>
          <Tab onClick={() => setCurrentTab(TabPage.Today)}>
            Today ({todaysAppointment.length})
          </Tab>
          <Tab onClick={() => setCurrentTab(TabPage.Tomorrow)}>
            Tomorrow ({tomorrowsAppointment.length})
          </Tab>
        </TabList>
      </Tabs>
      <PatientList
        patients={
          currentTab == TabPage.Today ? todaysAppointment : tomorrowsAppointment
        }
      />
    </div>
  );
};
