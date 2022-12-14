import React from 'react';
import { Center } from '@chakra-ui/react';
import { WaterMark } from './waterMark';
import { BioData } from './bioData';
import { Examination } from './examination';
import { Advice } from './advice';
import { Footer } from './footer';

interface Props {
  tableVariant: string;
  printContentRef: React.MutableRefObject<any>;
}

export const RecordPreview: React.FC<Props> = ({
  tableVariant,
  printContentRef,
}) => {
  return (
    <Center>
      <div className='overflow-x-scroll'>
        <div
          className='min-w-[1000px] max-w-[1000px] mt-10 bg-white text-black px-10 py-3'
          ref={printContentRef}
        >
          <WaterMark />
          <div className='w-full bg-black h-0.5 opacity-20 my-5' />

          <BioData tableVariant={tableVariant} />
          <Examination tableVariant={tableVariant} />
          <Advice tableVariant={tableVariant} />

          <div className='w-full bg-black h-0.5 opacity-20 my-5' />
          <Footer />
        </div>
      </div>
    </Center>
  );
};
