export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Appointment {
  id: string;
  userId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed';
  issueDescription: string;
  diagnosticResults?: string;
}