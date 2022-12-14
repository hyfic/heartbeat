import React from 'react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

interface Props {
  title?: string;
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
  disabledTitle?: boolean;
}

export const NumberInput: React.FC<Props> = ({
  title,
  value,
  setValue,
  disabled,
  disabledTitle,
}) => (
  <div className='w-full'>
    {!disabledTitle && <h2 className='mb-2 text-md'>{title}</h2>}
    <ChakraNumberInput
      placeholder='Temperature'
      variant='filled'
      size='md'
      value={value}
      onChange={setValue}
      isDisabled={disabled}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChakraNumberInput>
  </div>
);
