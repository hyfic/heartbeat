import React from 'react';
import { Input, Textarea } from '@chakra-ui/react';
import { SetState } from '@/types/react.type';

interface Props {
  title: string;
  value: string;
  setValue: SetState<string>;
  className?: string;
  disabled?: boolean;
  textArea?: boolean;
  disableTitle?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

export const TextInput: React.FC<Props> = ({
  title,
  value,
  setValue,
  className,
  disabled,
  textArea,
  disableTitle,
  type,
}) => {
  return (
    <div className={className}>
      {!disableTitle && <h2 className='mb-2 text-md'>{title}</h2>}
      {textArea ? (
        <Textarea
          variant='filled'
          placeholder={title}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <Input
          placeholder={title}
          type={type}
          variant='filled'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          autoComplete='off'
        />
      )}
    </div>
  );
};
