import React, { useEffect, useState } from 'react';
import { useRecordStore } from '@/store/record.store';
import { TextInput } from '@/components/common/textInput';
import { NumberInput } from '@/components/common/numberInput';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { Diagnosis } from './diagnosis';

export const Examination: React.FC = () => {
  const { record, setRecord, loading } = useRecordStore();

  const [generalExamination, setGeneralExamination] = useState(
    record.generalExamination
  );
  const [pulseRate, setPulseRate] = useState(record.pulseRate);
  const [systolic, setSystolic] = useState(record.systolic);
  const [diastolic, setDiastolic] = useState(record.diastolic);
  const [temperature, setTemperature] = useState(record.temperature);
  const [respiratoryRate, setRespiratoryRate] = useState(
    record.respiratoryRate
  );
  const [oxygenSaturation, setOxygenSaturation] = useState(
    record.oxygenSaturation
  );
  const [rs, setRs] = useState(record.rs);
  const [cvs, setCvs] = useState(record.cvs);
  const [git, setGit] = useState(record.git);
  const [cns, setCns] = useState(record.cns);
  const [musculoskeletal, setMusculoskeletal] = useState(
    record.musculoskeletal
  );
  const [ddsIfAny, setDdsIfAny] = useState(record.ddsIfAny);

  useEffect(() => {
    if (
      generalExamination === record.generalExamination &&
      pulseRate === record.pulseRate &&
      systolic === record.systolic &&
      diastolic === record.diastolic &&
      temperature === record.temperature &&
      respiratoryRate === record.respiratoryRate &&
      oxygenSaturation === record.oxygenSaturation &&
      rs === record.rs &&
      cvs === record.cvs &&
      git === record.git &&
      cns === record.cns &&
      musculoskeletal === record.musculoskeletal &&
      ddsIfAny === record.ddsIfAny
    )
      return;

    setRecord({
      ...record,
      generalExamination,
      pulseRate,
      systolic,
      diastolic,
      respiratoryRate,
      oxygenSaturation,
      temperature,
      rs,
      cvs,
      git,
      cns,
      musculoskeletal,
      ddsIfAny,
    });
  }, [
    generalExamination,
    pulseRate,
    systolic,
    diastolic,
    respiratoryRate,
    oxygenSaturation,
    temperature,
    rs,
    cvs,
    git,
    cns,
    musculoskeletal,
    ddsIfAny,
  ]);

  return (
    <div className='mt-5'>
      <Heading className='text-2xl' fontWeight='medium'>
        Examinations
      </Heading>
      <TextInput
        title='General examination'
        value={generalExamination || ''}
        setValue={setGeneralExamination}
        textArea
        disabled={loading}
        className='mt-5'
      />
      <h2 className='mt-3 text-lg font-medium'>Vitals</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <NumberInput
          title='Pulse rate (/min)'
          value={pulseRate || ''}
          setValue={setPulseRate}
          disabled={loading}
        />
        <div>
          <h2 className='mb-2 text-md'>Blood pressure (mmHg)</h2>
          <Flex alignItems='center'>
            <TextInput
              title='Systolic'
              value={systolic || ''}
              setValue={setSystolic}
              disabled={loading}
              disableTitle
            />
            <p className='mx-2 text-2xl'>/</p>
            <TextInput
              title='Diastolic'
              value={diastolic || ''}
              setValue={setDiastolic}
              disabled={loading}
              disableTitle
            />
          </Flex>
        </div>
        <NumberInput
          title='Respiratory rate (/min)'
          value={respiratoryRate || ''}
          setValue={setRespiratoryRate}
          disabled={loading}
        />
        <NumberInput
          title='Temperature (°F)'
          value={temperature || ''}
          setValue={setTemperature}
          disabled={loading}
        />
        <NumberInput
          title='SpO2 (%)'
          value={oxygenSaturation || ''}
          setValue={setOxygenSaturation}
          disabled={loading}
        />
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Systemic examination</h2>
      <SimpleGrid mt={2} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <TextInput
          title='R.S'
          value={rs || ''}
          setValue={setRs}
          disabled={loading}
          textArea
        />
        <TextInput
          title='C.V.S'
          value={cvs || ''}
          setValue={setCvs}
          disabled={loading}
          textArea
        />
        <TextInput
          title='G.I.T'
          value={git || ''}
          setValue={setGit}
          disabled={loading}
          textArea
        />
        <TextInput
          title='C.N.S'
          value={cns || ''}
          setValue={setCns}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Musculoskeletal'
          value={musculoskeletal || ''}
          setValue={setMusculoskeletal}
          disabled={loading}
          textArea
        />
        <TextInput
          title='DDs if any'
          value={ddsIfAny || ''}
          setValue={setDdsIfAny}
          disabled={loading}
          textArea
        />
      </SimpleGrid>
      <h2 className='mt-3 text-lg font-medium'>Provisional/Find diagnosis</h2>
      <Diagnosis />
    </div>
  );
};
