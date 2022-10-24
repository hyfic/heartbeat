import React, { useState } from 'react';
import { useRecordStore } from '@/store/record.store';
import { Plus, Trash } from 'tabler-icons-react';
import {
  TableContainer,
  Table,
  Th,
  Tr,
  Td,
  Thead,
  Tbody,
  IconButton,
  Input,
} from '@chakra-ui/react';

export const Diagnosis: React.FC = () => {
  const [diagnosisValue, setDiagnosisValue] = useState('');

  const { record, setRecord, loading } = useRecordStore();

  const addDiagnosis = () => {
    setRecord({
      ...record,
      diagnosis: [...(record.diagnosis || []), diagnosisValue],
    });
    setDiagnosisValue('');
  };

  return (
    <TableContainer mt={5}>
      <Table>
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Diagnosis</Th>
            <Th>Option</Th>
          </Tr>
        </Thead>
        <Tbody>
          <>
            {record.diagnosis &&
              record.diagnosis.map((diagnosisItem, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{diagnosisItem}</Td>
                  <Td>
                    <IconButton
                      colorScheme='red'
                      variant='ghost'
                      aria-label='Delete medicine'
                      icon={<Trash size={18} strokeWidth={2} />}
                      disabled={loading}
                      onClick={() => {
                        if (!record.diagnosis) return;
                        let tempDiagnosis = record.diagnosis;
                        tempDiagnosis.splice(idx, 1);
                        setRecord({ ...record, diagnosis: tempDiagnosis });
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            <Tr>
              <Td>{(record.diagnosis?.length || 0) + 1}</Td>
              <Td>
                <Input
                  placeholder='Diagnosis'
                  variant='filled'
                  value={diagnosisValue}
                  onChange={(e) => setDiagnosisValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      diagnosisValue.trim().length !== 0
                    ) {
                      addDiagnosis();
                    }
                  }}
                />
              </Td>
              <Td>
                <IconButton
                  aria-label='Add diagnosis'
                  variant='ghost'
                  colorScheme='teal'
                  icon={<Plus />}
                  disabled={loading || diagnosisValue.trim().length == 0}
                  onClick={addDiagnosis}
                />
              </Td>
            </Tr>
          </>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
