import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PatientContext, PatientContextType } from '../context/PatientContext';
import { PatientDataType } from '../types/patient';
import { Paths } from '../utils/paths';
import { ArrowNarrowLeft, CalendarEvent } from 'tabler-icons-react';
import { PatientRecords } from '../components/patient/PatientRecords';
import { EditBioData } from '../components/patient/EditBioData';
import { DeletePatient } from '../components/patient/DeletePatient';
import { ExportPatient } from '../components/patient/ExportPatient';

export const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loadPatient, patients } = useContext(
    PatientContext
  ) as PatientContextType;

  const [patient, setPatient] = useState<PatientDataType>({});

  useEffect(() => {
    if (!id) {
      navigate(Paths.patientList, { replace: true });
      return;
    }

    let patientId = Number(id);
    loadPatient(patientId)
      .then((patientJSON) => {
        setPatient(JSON.parse(patientJSON.data));
      })
      .catch(() => {
        navigate(Paths.patientList, { replace: true });
      });
  }, [id, patients]);

  return (
    <div>
      {patient.bioData && (
        <div>
          <Link to={Paths.patientList} replace>
            <IconButton
              aria-label='Go back'
              icon={<ArrowNarrowLeft />}
              mb={5}
              variant='ghost'
            />
          </Link>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Avatar size='lg' name={patient.bioData.name} />
              <Flex direction='column' ml={3}>
                <Text fontSize='xl' fontWeight='medium'>
                  {patient.bioData.name}
                </Text>
                <Text>
                  {patient.bioData.age && <span>{patient.bioData.age}</span>}
                  {patient.bioData.age && patient.bioData.sex && (
                    <span className='mx-1'>/</span>
                  )}
                  {patient.bioData.sex && <span>{patient.bioData.sex}</span>}
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems='center'>
              <EditBioData
                patientId={Number(id)}
                patientData={patient}
                setPatientData={setPatient}
              />
              <DeletePatient
                patientId={Number(id)}
                patientName={patient.bioData.name || ''}
              />
              <ExportPatient patientData={patient} />
            </Flex>
          </Flex>
          {patient.bioData.address && (
            <p className='mt-3'>{patient.bioData.address}</p>
          )}
          {patient.records &&
            patient.records.length !== 0 &&
            patient.records[0].nextAppointment &&
            (moment(patient.records[0].nextAppointment).isAfter() ||
              moment(patient.records[0].nextAppointment).isSame(
                moment(),
                'day'
              )) && (
              <Flex className='mt-3' alignItems='center'>
                <CalendarEvent size={20} />
                <Text ml={1}>
                  {moment(patient.records[0].nextAppointment).format(
                    'dddd, MMM D YYYY'
                  )}
                </Text>
              </Flex>
            )}
          <PatientRecords
            patientId={Number(id)}
            patientData={patient}
            setPatientData={setPatient}
          />
        </div>
      )}
    </div>
  );
};
