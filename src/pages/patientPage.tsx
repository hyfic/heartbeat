import React, { useEffect } from 'react';
import moment from 'moment';
import { DatabaseChecker } from '@/components/databaseChecker';
import { useQuery } from '@/utils/useQuery';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDatabaseStore } from '@/store/database.store';
import { useIndividualPatientStore } from '@/store/patient.store';
import { Paths } from '@/utils/paths';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import {
  AddressBook,
  ArrowNarrowLeft,
  CalendarEvent,
  Phone,
} from 'tabler-icons-react';
import { EditBioData } from '@/components/patient/editBioData';
import { DeletePatient } from '@/components/patient/deletePatient';

export const PatientPage: React.FC = () => {
  const { selectedDatabase } = useDatabaseStore();

  const navigate = useNavigate();
  const query = useQuery(); // get the previous page path
  const prevPath = query.get('path') || Paths.patientList;

  const { id } = useParams();

  // const [patient, setPatient] = useState<PatientType | null>(null);
  // const [loading, setIsLoading] = useState(false);
  const { patient, loading, loadPatient } = useIndividualPatientStore();

  useEffect(() => {
    if (!id || !selectedDatabase) {
      navigate(prevPath, { replace: true });
      return;
    }

    loadPatient(selectedDatabase.path, Number(id), () => {
      // redirect back to previous path, if there is no patient with id
      navigate(prevPath, { replace: true });
    });
  }, [id, selectedDatabase]);

  return (
    <DatabaseChecker>
      {loading && <p>Loading ...</p>}
      {patient && (
        <div>
          <Link to={prevPath}>
            <IconButton
              aria-label='Go back'
              icon={<ArrowNarrowLeft />}
              mb={5}
              variant='ghost'
              onClick={() => {}}
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
              <EditBioData />
              <DeletePatient />
            </Flex>
          </Flex>
          <div className='mt-3 flex items-center'>
            {patient.bioData.phone && (
              <div className='flex items-center mr-3'>
                <Phone size={18} className='mr-1' />
                <p>{patient.bioData.phone}</p>
              </div>
            )}
            {patient.appointment && (
              <Flex alignItems='center'>
                <CalendarEvent size={20} />
                <Text ml={1}>
                  {moment(patient.appointment).format('dddd, MMM D YYYY')}
                </Text>
              </Flex>
            )}
          </div>
          {patient.bioData.address && (
            <div
              className={`${
                patient.bioData.phone ? 'mt-2' : 'mt-3'
              } flex items-center`}
            >
              <AddressBook size={20} className='mr-1' />
              <p>{patient.bioData.address}</p>
            </div>
          )}
        </div>
      )}
    </DatabaseChecker>
  );
};
