export interface LabTest {
  id: string;
  testCode: string;
  testName: string;
  category: string;
  price: number;
  description?: string;
}

export interface LabOrderItem {
  id: string;
  result?: string;
  unit?: string;
  referenceRange?: string;
  remarks?: string;

  labTest: LabTest;
}

export interface LabOrder {
  id: string;

  status: string;

  patient: {
    id: string;
    patientNumber: string;
    fullName: string;
  };

  doctor: {
    id: string;
    fullName: string;
    specialization: string;
  };

  items: LabOrderItem[];
}