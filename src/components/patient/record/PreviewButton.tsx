import React from 'react';
import { Eye } from 'tabler-icons-react';
import { PreviewContent } from '../preview';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { PatientBioDataType, PatientRecordType } from '../../../types/patient';

interface Props {
  patientCreatedAt: number;
  patientBioData: PatientBioDataType;
  patientRecord: PatientRecordType;
  useButton?: boolean;
}

export const PreviewButton: React.FC<Props> = ({
  patientCreatedAt,
  patientBioData,
  patientRecord,
  useButton,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {useButton ? (
        <Button colorScheme='teal' onClick={onOpen}>
          Preview
        </Button>
      ) : (
        <IconButton
          aria-label='preview'
          variant='ghost'
          colorScheme='teal'
          icon={<Eye size={18} />}
          onClick={onOpen}
        />
      )}
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className='mt-5' />
            <PreviewContent
              patientCreatedAt={patientCreatedAt}
              patientBioData={patientBioData}
              patientRecord={patientRecord}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
