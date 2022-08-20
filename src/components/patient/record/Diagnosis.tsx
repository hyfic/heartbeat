import React, { useState } from 'react';
import { TextInput } from '../../common/TextInput';
import { Plus, Trash } from 'tabler-icons-react';
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { SetState } from '../../../types/react';

interface Props {
  diagnosis: string[];
  setDiagnosis: SetState<string[]>;
  loading: boolean;
}

export const Diagnosis: React.FC<Props> = ({
  diagnosis,
  setDiagnosis,
  loading,
}) => {
  const [diagnosisValue, setDiagnosisValue] = useState('');

  return (
    <TableContainer mt={5}>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Diagnosis</Th>
            <Th>Option</Th>
          </Tr>
        </Thead>
        <Tbody>
          <>
            {diagnosis.map((diagnosisItem, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{diagnosisItem}</Td>
                <Td>
                  <IconButton
                    colorScheme='red'
                    variant='ghost'
                    aria-label='Delete medicine'
                    icon={<Trash />}
                    disabled={loading}
                    onClick={() => {
                      let tempDiagnosis = [...diagnosis];
                      tempDiagnosis.splice(idx, 1);
                      setDiagnosis(tempDiagnosis);
                    }}
                  />
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td>{diagnosis.length + 1}</Td>
              <Td>
                <TextInput
                  disableTitle
                  title='Diagnosis'
                  value={diagnosisValue}
                  setValue={setDiagnosisValue}
                  disabled={loading}
                />
              </Td>
              <Td>
                <IconButton
                  aria-label='Add diagnosis'
                  variant='ghost'
                  colorScheme='teal'
                  icon={<Plus />}
                  disabled={loading || diagnosisValue.trim().length == 0}
                  onClick={() => {
                    setDiagnosis([...diagnosis, diagnosisValue]);
                    setDiagnosisValue('');
                  }}
                />
              </Td>
            </Tr>
          </>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
