import React from 'react';
import { Eye } from 'tabler-icons-react';
import { PreviewContent } from '../preview';
import { useRecordStore } from '@/store/record.store';
import { PatientRecordType } from '@/types/patient.type';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  record: PatientRecordType;
  useButton?: boolean;
}

export const PreviewRecord: React.FC<Props> = ({ useButton, record }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setRecord } = useRecordStore();

  const handleOpenRecordPreview = () => {
    onOpen();
    setRecord(record);
  };

  return (
    <>
      {useButton ? (
        <Button colorScheme='teal' onClick={handleOpenRecordPreview}>
          Preview
        </Button>
      ) : (
        <Tooltip label='Preview record'>
          <IconButton
            aria-label='preview'
            variant='ghost'
            colorScheme='teal'
            icon={<Eye size={18} />}
            onClick={handleOpenRecordPreview}
          />
        </Tooltip>
      )}
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className='mt-5' />
            <PreviewContent onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
