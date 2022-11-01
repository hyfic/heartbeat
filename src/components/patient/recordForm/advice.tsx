import React, { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { AdviceMedicines } from './adviceMedicines';
import { TextInput } from '@/components/common/textInput';
import { useRecordStore } from '@/store/record.store';

export const Advice: React.FC = () => {
  const { record, setRecord, loading } = useRecordStore();

  const [advice, setAdvice] = useState(record.advice);
  const [investigationToDo, setInvestigationToDo] = useState(
    record.investigationToDo
  );

  useEffect(() => {
    if (
      advice === record.advice &&
      investigationToDo === record.investigationToDo
    )
      return;
    setRecord({ ...record, advice, investigationToDo });
  }, [advice, investigationToDo]);

  return (
    <div>
      <Heading mt={5} className='text-2xl' fontWeight='medium'>
        Advice
      </Heading>
      <AdviceMedicines />
      <TextInput
        title='Advice'
        value={advice || ''}
        setValue={setAdvice}
        disabled={loading}
        textArea
        className='mt-2'
      />
      <TextInput
        title='Investigation to do'
        value={investigationToDo || ''}
        setValue={setInvestigationToDo}
        disabled={loading}
        textArea
        className='mt-2'
      />
    </div>
  );
};
