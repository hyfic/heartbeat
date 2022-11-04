import React, { useState } from 'react';
import { FileExport } from 'tabler-icons-react';
import { TextInput } from '@/components/common/textInput';
import { useIndividualPatientStore } from '@/store/patient.store';
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { showToast } from '@/utils/showToast';

export const ExportPatient: React.FC = ({}) => {
  const { patient } = useIndividualPatientStore();

  const [fileName, setFilename] = useState(
    `${patient?.bioData?.name && patient.bioData.name + '_'}${patient?.pid}`
  );

  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const onClose = () => {
    setFilename(
      `${patient?.bioData?.name && patient.bioData.name + '_'}${patient?.pid}`
    );
    closeModal();
  };

  const exportData = () => {
    let file = new Blob([JSON.stringify(patient)], { type: 'text/json' });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = fileName + '.json';
    a.click();

    onClose();
    showToast({
      title: `${fileName} saved to downloads successfully`,
      status: 'success',
    });
  };

  return (
    <>
      <Tooltip label='Export patient data' placement='left'>
        <IconButton
          aria-label='Export data'
          icon={<FileExport size={20} strokeWidth={2} />}
          variant='ghost'
          onClick={onOpen}
        />
      </Tooltip>
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
