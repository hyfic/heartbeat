import React, { useState } from 'react';
import { useRecordStore } from '@/store/record.store';
import { TextInput } from '@/components/common/textInput';
import { NumberInput } from '@/components/common/numberInput';
import { Plus, Trash } from 'tabler-icons-react';
import {
  Checkbox,
  Flex,
  Heading,
  IconButton,
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

  const calculateBMI = (heightNumber: number, weightNumber: number) => {
    if (record.heightUnit == 'Centimeter') {
      heightNumber = heightNumber * 0.01;
    }

    if (record.heightUnit == 'Inch') {
      heightNumber = heightNumber * 0.0254;
    }

    const bmi = weightNumber / (heightNumber * heightNumber);
    return bmi.toFixed(2);
  };

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
              value={record.height || ''}
              setValue={(height) => setRecord({ ...record, height })}
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
          value={record.weight || ''}
          setValue={(weight) => setRecord({ ...record, weight })}
          disabled={loading}
        />
        <TextInput
          title='BMI'
          value={calculateBMI(Number(record.height), Number(record.weight))}
          setValue={() => {}}
          disabled
        />
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
                  <Th w='full'>Medicine</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {record.allergicMedicines.map((medicine, idx) => (
                  <Tr key={idx}>
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
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {record.allergicMedicines && (
          <form
            className='flex items-center mt-3'
            onSubmit={(e) => {
              e.preventDefault();
              setRecord({
                ...record,
                allergicMedicines: [
                  ...(record.allergicMedicines || []),
                  allergicMedicine,
                ],
              });
              setAllergicMedicine('');
            }}
          >
            <TextInput
              title='Allergic medicine'
              disableTitle
              value={allergicMedicine}
              setValue={setAllergicMedicine}
              className='w-full'
            />
            <IconButton
              type='submit'
              variant='ghost'
              aria-label='Add medicine'
              colorScheme='blue'
              icon={<Plus />}
              ml={1}
              disabled={loading || allergicMedicine.trim().length === 0}
            >
              Add Medicine
            </IconButton>
          </form>
        )}
      </div>
      <SimpleGrid mt={3} columns={{ sm: 1, lg: 2 }} gap={2}>
        <TextInput
          title='Chief complaints'
          value={record.chiefComplaint || ''}
          setValue={(chiefComplaint) =>
            setRecord({ ...record, chiefComplaint })
          }
          disabled={loading}
          textArea
        />
        <TextInput
          title='Past medical history'
          value={record.pastMedicalHistory || ''}
          setValue={(pastMedicalHistory) =>
            setRecord({ ...record, pastMedicalHistory })
          }
          disabled={loading}
          textArea
        />
        <TextInput
          title='Personal history'
          value={record.personalHistory || ''}
          setValue={(personalHistory) =>
            setRecord({ ...record, personalHistory })
          }
          disabled={loading}
          textArea
        />
        <TextInput
          title='Family history'
          value={record.familyHistory || ''}
          setValue={(familyHistory) => setRecord({ ...record, familyHistory })}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Treatment history'
          value={record.treatmentHistory || ''}
          setValue={(treatmentHistory) =>
            setRecord({ ...record, treatmentHistory })
          }
          disabled={loading}
          textArea
        />
      </SimpleGrid>
    </div>
  );
};
