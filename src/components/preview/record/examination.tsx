import React from 'react';
import { LightMode, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useRecordStore } from '@/store/record.store';

interface Props {
  tableVariant: string;
}

export const Examination: React.FC<Props> = ({ tableVariant }) => {
  const { record } = useRecordStore();

  let checkVitals =
    record.pulseRate ||
    record.systolic ||
    record.diastolic ||
    record.oxygenSaturation ||
    record.temperature ||
    record.respiratoryRate;

  let checkExamination =
    record.generalExamination ||
    checkVitals ||
    record.cns ||
    record.rs ||
    record.cvs ||
    record.git ||
    record.musculoskeletal ||
    record.ddsIfAny;

  return checkExamination ? (
    <div className='mt-5'>
      <h2 className='text-xl font-semibold mb-3'>EXAMINATION</h2>
      <LightMode>
        <Table variant={tableVariant}>
          <Tbody>
            {record.generalExamination && (
              <Tr>
                <Td fontWeight='medium'>GENERAL EXAMINATION</Td>
                <Td>{record.generalExamination}</Td>
              </Tr>
            )}
            {checkVitals && (
              <Tr>
                <Td fontWeight='medium'>VITALS</Td>
                <Td>
                  {record.pulseRate && <>Pulse: {record.pulseRate} /min, </>}
                  {record.systolic && record.diastolic && (
                    <>
                      BP: {record.systolic}/{record.diastolic} mmHg,{' '}
                    </>
                  )}
                  {record.systolic && !record.diastolic && (
                    <>BP: {record.systolic} Systolic, </>
                  )}
                  {record.oxygenSaturation && (
                    <>SPO2: {record.oxygenSaturation}%, </>
                  )}
                  {record.temperature && <>Temp: {record.temperature}°F, </>}
                  {record.respiratoryRate && (
                    <>RR: {record.respiratoryRate} /min</>
                  )}
                </Td>
              </Tr>
            )}
            {record.cns && (
              <Tr>
                <Td fontWeight='medium'>CNS</Td>
                <Td>{record.cns}</Td>
              </Tr>
            )}
            {record.rs && (
              <Tr>
                <Td fontWeight='medium'>RS</Td>
                <Td>{record.rs}</Td>
              </Tr>
            )}
            {record.cvs && (
              <Tr>
                <Td fontWeight='medium'>CVS</Td>
                <Td>{record.cvs}</Td>
              </Tr>
            )}
            {record.git && (
              <Tr>
                <Td fontWeight='medium'>GIT</Td>
                <Td>{record.git}</Td>
              </Tr>
            )}
            {record.musculoskeletal && (
              <Tr>
                <Td fontWeight='medium'>MUSCULOSKELETAL</Td>
                <Td>{record.musculoskeletal}</Td>
              </Tr>
            )}
            {record.ddsIfAny && (
              <Tr>
                <Td fontWeight='medium'>DDs IF ANY</Td>
                <Td>{record.ddsIfAny}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </LightMode>
    </div>
  ) : null;
};
