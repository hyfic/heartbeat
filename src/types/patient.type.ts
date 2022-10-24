// these types are from a professional doctor

export interface PatientBioDataType {
  name: string;
  age: string;
  sex: string;
  address: string;
  phone: string;
}

export interface PatientMedicineType {
  medicineName: string;
  frequency: string;
  time: string;
  duration: string;
}

export interface PatientRecordType {
  // medical bio data
  height?: string;
  heightUnit: 'Centimeter' | 'Metre' | 'Inch';
  weight?: string;
  bmi?: string;
  allergicMedicines?: string[];
  remark?: string;
  chiefComplaint?: string;
  pastMedicalHistory?: string;
  personalHistory?: string;
  familyHistory?: string;
  treatmentHistory?: string;
  // examinations
  generalExamination?: string;
  pulseRate?: string;
  systolic?: string;
  diastolic?: string;
  respiratoryRate?: string;
  oxygenSaturation?: string;
  temperature?: string;
  rs?: string;
  cvs?: string;
  git?: string;
  cns?: string;
  musculoskeletal?: string;
  ddsIfAny?: string;
  diagnosis?: string[];
  // advice
  medicines?: PatientMedicineType[];
  advice?: string;
  investigationToDo?: string;
  appointment?: string;
  createdAt: string;
}

export interface PatientType {
  id: number;
  pid: string;
  createdAt: string;
  updatedAt: string;
  bioData: PatientBioDataType;
  records: PatientRecordType[];
  appointment: string;
}

// raw data type from database
export interface PatientRawType {
  id: number;
  pid: string;
  created_at: string;
  updated_at: string;
  bio_data: string;
  records: string;
  appointment: string;
}
