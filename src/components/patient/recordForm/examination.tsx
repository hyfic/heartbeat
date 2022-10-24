import React from 'react';
import { useRecordStore } from '@/store/record.store';
import { TextInput } from '@/components/common/textInput';
import { NumberInput } from '@/components/common/numberInput';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Diagnosis } from './diagnosis';

export const Examination: React.FC = () => {
  const { record, setRecord, loading } = useRecordStore();

  return (
    <div className='mt-5'>
      <Heading className='text-2xl' fontWeight='medium'>
        Examinations
      </Heading>
      <TextInput
        title='General examination'
        value={record.generalExamination || ''}
        setValue={(generalExamination) =>
          setRecord({ ...record, generalExamination })
        }
        textArea
        disabled={loading}
        className='mt-5'
      />
      <h2 className='mt-3 text-lg font-medium'>Vitals</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <NumberInput
          title='Pulse rate (/min)'
          value={record.pulseRate || ''}
          setValue={(pulseRate) => setRecord({ ...record, pulseRate })}
          disabled={loading}
        />
        <div>
          <h2 className='mb-2 text-md'>Blood pressure (mmHg)</h2>
          <Flex alignItems='center'>
            <TextInput
              title='Systolic'
              value={record.systolic || ''}
              setValue={(systolic) => setRecord({ ...record, systolic })}
              disabled={loading}
              disableTitle
            />
            <p className='mx-2 text-2xl'>/</p>
            <TextInput
              title='Diastolic'
              value={record.diastolic || ''}
              setValue={(diastolic) => setRecord({ ...record, diastolic })}
              disabled={loading}
              disableTitle
            />
          </Flex>
        </div>
        <NumberInput
          title='Respiratory rate (/min)'
          value={record.respiratoryRate || ''}
          setValue={(respiratoryRate) =>
            setRecord({ ...record, respiratoryRate })
          }
          disabled={loading}
        />
        <NumberInput
          title='Temperature (°F)'
          value={record.temperature || ''}
          setValue={(temperature) => setRecord({ ...record, temperature })}
          disabled={loading}
        />
        <NumberInput
          title='SpO2 (%)'
          value={record.oxygenSaturation || ''}
          setValue={(oxygenSaturation) =>
            setRecord({ ...record, oxygenSaturation })
          }
          disabled={loading}
        />
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Systemic examination</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <TextInput
          title='R.S'
          value={record.rs || ''}
          setValue={(rs) => setRecord({ ...record, rs })}
          disabled={loading}
          textArea
        />
        <TextInput
          title='C.V.S'
          value={record.cvs || ''}
          setValue={(cvs) => setRecord({ ...record, cvs })}
          disabled={loading}
          textArea
        />
        <TextInput
          title='G.I.T'
          value={record.git || ''}
          setValue={(git) => setRecord({ ...record, git })}
          disabled={loading}
          textArea
        />
        <TextInput
          title='C.N.S'
          value={record.cns || ''}
          setValue={(cns) => setRecord({ ...record, cns })}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Musculoskeletal'
          value={record.musculoskeletal || ''}
          setValue={(musculoskeletal) =>
            setRecord({ ...record, musculoskeletal })
          }
          disabled={loading}
          textArea
        />
        <TextInput
          title='DDs if any'
          value={record.ddsIfAny || ''}
          setValue={(ddsIfAny) => setRecord({ ...record, ddsIfAny })}
          disabled={loading}
          textArea
        />
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Provisional/Find diagnosis</h2>
      <Diagnosis />
    </div>
  );
};
