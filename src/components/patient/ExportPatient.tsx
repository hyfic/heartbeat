import React, { useState } from 'react';
import { FileExport } from 'tabler-icons-react';
import { PatientDataType } from '../../types/patient';
import { getId } from '../../utils/getId';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { TextInput } from '../common/TextInput';

interface Props {
  patientData: PatientDataType;
}

export const ExportPatient: React.FC<Props> = ({ patientData }) => {
  const [fileName, setFilename] = useState(
    `${patientData.bioData?.name && patientData.bioData.name + '_'}${getId(
      patientData.createdAt || 0
    )}`
  );

  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const onClose = () => {
    setFilename(
      `${patientData.bioData?.name && patientData.bioData.name + '_'}${getId(
        patientData.createdAt || 0
      )}`
    );
    closeModal();
  };

  const exportData = () => {
    let file = new Blob([JSON.stringify(patientData)], { type: 'text/json' });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = fileName + '.json';
    a.click();
  };

  return (
    <>
      <IconButton
        aria-label='Export data'
        icon={<FileExport size={20} strokeWidth={2} />}
        variant='ghost'
        onClick={onOpen}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextInput
              title='File name'
              disableTitle
              value={fileName}
              setValue={setFilename}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              disabled={fileName.trim().length === 0}
              onClick={exportData}
            >
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
