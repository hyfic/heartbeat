import React, { useEffect, useState } from 'react';
import { useRecordStore } from '@/store/record.store';
import { TextInput } from '@/components/common/textInput';
import { NumberInput } from '@/components/common/numberInput';
import { Plus, Trash } from 'tabler-icons-react';
import {
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const MedicalBioData: React.FC = () => {
  const { record, setRecord, loading } = useRecordStore();

  const [allergicMedicine, setAllergicMedicine] = useState('');
  const [height, setHeight] = useState(record.height);
  const [weight, setWeight] = useState(record.weight);
  const [bmi, setBmi] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState(record.chiefComplaint);
  const [pastMedicalHistory, setPastMedicalHistory] = useState(
    record.pastMedicalHistory
  );
  const [personalHistory, setPersonalHistory] = useState(
    record.personalHistory
  );
  const [familyHistory, setFamilyHistory] = useState(record.familyHistory);
  const [treatmentHistory, setTreatmentHistory] = useState(
    record.treatmentHistory
  );

  const calculateBMI = (heightNumber: number, weightNumber: number) => {
    if (record.heightUnit == 'Centimeter') {
      heightNumber = heightNumber * 0.01;
    }

    if (record.heightUnit == 'Inch') {
      heightNumber = heightNumber * 0.0254;
    }

    const bmi = weightNumber / (heightNumber * heightNumber);
    if (isNaN(bmi)) return '0.00';
    return bmi.toFixed(2);
  };

  const addAllergicMedicine = () => {
    setRecord({
      ...record,
      allergicMedicines: [
        ...(record.allergicMedicines || []),
        allergicMedicine,
      ],
    });
    setAllergicMedicine('');
  };

  useEffect(() => {
    setBmi(calculateBMI(Number(height), Number(weight)));
  }, [height, weight]);

  useEffect(() => {
    if (
      record.height === height &&
      record.weight === weight &&
      record.bmi === bmi &&
      record.chiefComplaint === chiefComplaint &&
      record.pastMedicalHistory === pastMedicalHistory &&
      record.personalHistory === personalHistory &&
      record.familyHistory === familyHistory
    )
      return;

    setRecord({
      ...record,
      height,
      weight,
      bmi,
      chiefComplaint,
      pastMedicalHistory,
      personalHistory,
      familyHistory,
    });
  }, [
    height,
    weight,
    chiefComplaint,
    pastMedicalHistory,
    personalHistory,
    familyHistory,
    treatmentHistory,
    bmi,
  ]);

  return (
    <div>
      <Heading className='text-2xl' fontWeight='medium'>
        Biodata
      </Heading>
      <SimpleGrid mt={5} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>
            Height (
            {record.heightUnit == 'Centimeter' ? 'CM' : record.heightUnit[0]})
          </h2>
          <Flex alignItems='center' justifyContent='space-between'>
            <NumberInput
              disabledTitle
              value={height || ''}
              setValue={setHeight}
              disabled={loading}
            />
            <Select
              variant='filled'
              width='28%'
              ml={2}
              value={record.heightUnit}
              onChange={(e: any) =>
                setRecord({ ...record, heightUnit: e.target.value })
              }
            >
              <option value='Centimeter'>CM</option>
              <option value='Metre'>M</option>
              <option value='Inch'>I</option>
            </Select>
          </Flex>
        </div>
        <NumberInput
          title='Weight (Kg)'
          value={weight || ''}
          setValue={setWeight}
          disabled={loading}
        />
        <TextInput title='BMI' value={bmi} setValue={() => {}} disabled />
      </SimpleGrid>
      <div className='mt-3'>
        <Checkbox
          isChecked={record.allergicMedicines ? true : false}
          size='lg'
          onChange={(e) => {
            if (e.target.checked) {
              setRecord({ ...record, allergicMedicines: [] });
              return;
            }

            delete record.allergicMedicines; // removed allergic medicines field if checkbox is not checked
            setRecord(record);
          }}
          disabled={loading}
        >
          Allergic to medicines
        </Checkbox>
        {record.allergicMedicines && (
          <TableContainer mt={3}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Index</Th>
                  <Th>Medicine</Th>
                  <Th>Option</Th>
                </Tr>
              </Thead>
              <Tbody>
                {record.allergicMedicines.map((medicine, idx) => (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{medicine}</Td>
                    <Td>
                      <IconButton
                        colorScheme='red'
                        variant='ghost'
                        aria-label='Delete medicine'
                        icon={<Trash size={18} strokeWidth={2} />}
                        onClick={() => {
                          if (!record.allergicMedicines) return;
                          let allergicMedicines = record.allergicMedicines;
                          allergicMedicines.splice(idx, 1);
                          setRecord({ ...record, allergicMedicines });
                        }}
                        disabled={loading}
                      />
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td>{record?.allergicMedicines.length + 1}</Td>
                  <Td>
                    <Input
                      placeholder='Allergic medicine'
                      variant='filled'
                      value={allergicMedicine}
                      onChange={(e) => setAllergicMedicine(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          e.key === 'Enter' &&
                          allergicMedicine.trim().length !== 0
                        ) {
                          addAllergicMedicine();
                        }
                      }}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      type='submit'
                      variant='ghost'
                      aria-label='Add medicine'
                      colorScheme='blue'
                      icon={<Plus />}
                      ml={1}
                      disabled={loading || allergicMedicine.trim().length === 0}
                      onClick={addAllergicMedicine}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
      <SimpleGrid mt={3} columns={{ sm: 1, lg: 2 }} gap={2}>
        <TextInput
          title='Chief complaints'
          value={chiefComplaint || ''}
          setValue={setChiefComplaint}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Past medical history'
          value={pastMedicalHistory || ''}
          setValue={setPastMedicalHistory}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Personal history'
          value={personalHistory || ''}
          setValue={setPersonalHistory}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Family history'
          value={familyHistory || ''}
          setValue={setFamilyHistory}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Treatment history'
          value={treatmentHistory || ''}
          setValue={setTreatmentHistory}
          disabled={loading}
          textArea
        />
      </SimpleGrid>
    </div>
  );
};
