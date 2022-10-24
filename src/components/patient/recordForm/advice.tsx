import React from 'react';
import { Heading } from '@chakra-ui/react';
import { AdviceMedicines } from './adviceMedicines';
import { TextInput } from '@/components/common/textInput';
import { useRecordStore } from '@/store/record.store';

export const Advice: React.FC = () => {
  const { record, setRecord, loading } = useRecordStore();

  return (
    <div>
      <Heading mt={5} className='text-2xl' fontWeight='medium'>
        Advice
      </Heading>
      <AdviceMedicines />
      <TextInput
        title='Advice'
        value={record.advice || ''}
        setValue={(advice) => setRecord({ ...record, advice })}
        disabled={loading}
        textArea
        className='mt-2'
      />
      <TextInput
        title='Investigation to do'
        value={record.investigationToDo || ''}
        setValue={(investigationToDo) =>
          setRecord({ ...record, investigationToDo })
        }
        disabled={loading}
        textArea
        className='mt-2'
      />
    </div>
  );
};
