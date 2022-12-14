import React from 'react';
import { ReactComponent } from '@/types/react.type';
import { appWindow } from '@tauri-apps/api/window';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export const AppCloseConfirm: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  appWindow.listen('tauri://close-requested', onOpen);

  const closeWindow = async () => {
    await appWindow.close();
  };

  return (
    <>
      {children}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Are you sure ?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Do you want to close this app.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} variant='outline'>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={closeWindow} ml={3}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
