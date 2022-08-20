import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PatientContext, PatientContextType } from '../context/PatientContext';
import { PatientDataType } from '../types/patient';
import { Paths } from '../utils/paths';
import { ArrowNarrowLeft, FileExport } from 'tabler-icons-react';
import { PatientRecords } from '../components/patient/PatientRecords';
import { EditBioData } from '../components/patient/EditBioData';
import { DeletePatient } from '../components/patient/DeletePatient';

export const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loadPatient, patients } = useContext(
    PatientContext
  ) as PatientContextType;

  const [patient, setPatient] = useState<PatientDataType>({});

  useEffect(() => {
    if (!id) {
      navigate(Paths.patient, { replace: true });
      return;
    }

    let patientId = Number(id);
    loadPatient(patientId)
      .then((patientJSON) => {
        setPatient(JSON.parse(patientJSON.data));
      })
      .catch(() => {
        navigate(Paths.patient, { replace: true });
      });
  }, [id, patients]);

  return (
    <div>
      {patient.bioData && (
        <div>
          <Link to={Paths.patient} replace>
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
              <IconButton
                aria-label='Export data'
                icon={<FileExport size={20} strokeWidth={2} />}
                variant='ghost'
              />
            </Flex>
          </Flex>
          {patient.bioData.address && (
            <p className='mt-3'>{patient.bioData.address}</p>
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
