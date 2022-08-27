import React, { useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Header } from './Header';
import { RecordPreview } from './record';
import { useReactToPrint } from 'react-to-print';
import { getId } from '../../../utils/getId';
import { PatientBioDataType, PatientRecordType } from '../../../types/patient';

interface Props {
  patientCreatedAt: number;
  patientBioData: PatientBioDataType;
  patientRecord: PatientRecordType;
  onClose: any;
}

export const PreviewContent: React.FC<Props> = ({
  patientCreatedAt,
  patientBioData,
  patientRecord,
  onClose,
}) => {
  const toast = useToast();
  const printContentRef = useRef<any>();

  const [printLoading, setPrintLoading] = useState(false);
  const [tableVariant, setTableVariant] = useState('striped');

  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle:
      `${getId(patientCreatedAt || Date.now())}_${patientBioData?.name}` ||
      'patient_details',
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
        patientCreatedAt={patientCreatedAt}
        patientBioData={patientBioData || {}}
        patientRecord={patientRecord}
        printContentRef={printContentRef}
        tableVariant={tableVariant}
      />
    </div>
  );
};
