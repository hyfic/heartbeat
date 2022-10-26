import React, { useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Header } from './header';
import { RecordPreview } from './record';
import { useReactToPrint } from 'react-to-print';
import { useIndividualPatientStore } from '@/store/patient.store';

interface Props {
  onClose: any;
}

export const PreviewContent: React.FC<Props> = ({ onClose }) => {
  const toast = useToast();
  const printContentRef = useRef<any>();

  const [printLoading, setPrintLoading] = useState(false);
  const [tableVariant, setTableVariant] = useState('striped');

  const { patient } = useIndividualPatientStore();

  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle:
      `${patient?.pid}_${patient?.bioData.name}` || 'patient_details',
    onBeforeGetContent() {
      setPrintLoading(true);
    },
    pageStyle: `
      @page { 
        size: auto;  
        margin: 0;
      }
      
      @media print { 
        body { 
          -webkit-print-color-adjust: exact; 
        } 
      }
      
      @print {
        @page :footer {
            display: none
        }
    
        @page :header {
            display: none
        }
      }

      @media print {
          @page {
              margin-top: 0;
              margin-bottom: 0;
          }
          body {
              padding-top: 72px;
              padding-bottom: 72px;
          }

          @page { 
            margin-top: 30px;
            margin-bottom: 20px;
          }

          @page :first {
            margin-top: 0;
          }
      }
      `,
    onAfterPrint() {
      setPrintLoading(false);
    },
    onPrintError(err) {
      setPrintLoading(false);
      toast({
        title: 'Failed to print',
        description: err,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <div>
      <Header
        printContent={handlePrint}
        printLoading={printLoading}
        tableVariant={tableVariant}
        setTableVariant={setTableVariant}
        onClose={onClose}
      />
      <RecordPreview
        printContentRef={printContentRef}
        tableVariant={tableVariant}
      />
    </div>
  );
};
