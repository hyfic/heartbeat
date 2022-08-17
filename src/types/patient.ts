export interface PatientBioDataType {
  name?: string;
  age?: string;
  sex?: string;
  address?: string;
}

export interface PatientMedicalBioDataType {
  height?: string;
  heightUnit?: string;
  weight?: string;
  bmi?: string;
  allergyToMedicine?: {
    status?: boolean;
    medicines?: string;
  };
  remark?: string;
  chiefComplaint?: string;
  pastMedicalHistory?: string;
  personalHistory?: string;
  familyHistory?: string;
  treatmentHistory?: string;
}

export interface PatientVitalsType {
  pulseRate?: string;
  bloodPressure?: {
    systolic?: string;
    diastolic?: string;
  };
  respiratoryRate?: string;
  oxygenSaturation?: string;
  temperature?: string;
}

export interface PatientSystemicExaminationType {
  rs?: string;
  cvs?: string;
  git?: string;
  cns?: string;
  musculoskeletal?: string;
  ddsIfAny?: string;
  diagnosis?: string[];
}

export interface PatientExaminationType {
  generalExamination?: string;
  vitals?: PatientVitalsType;
  systemicExamination?: PatientSystemicExaminationType;
}

export interface PatientMedicineType {
  medicineName: string;
  frequency: string;
  time: string;
  duration: string;
}

export interface PatientAdviceType {
  medicines?: PatientMedicineType[];
  advice?: string;
  investigationToDo?: string;
}

export interface PatientRecordType {
  medicalBioData?: PatientMedicalBioDataType;
  examination?: PatientExaminationType;
  advice?: PatientAdviceType;
  nextAppointment?: number;
  createdAt?: number;
}

export interface PatientDataType {
  bioData?: PatientBioDataType;
  records?: PatientRecordType[];
  createdAt?: number;
  updatedAt?: number;
}

export interface PatientType {
  id: number;
  data: string;
}
