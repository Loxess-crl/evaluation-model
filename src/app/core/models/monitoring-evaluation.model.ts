import { Staff } from './staff-pagination.model';

export interface MonitoringEvaluation {
  id: number;
  date: string;
  evaluation: any;
  nombre: string;
  staff: Staff;
}

export interface CertificationEvaluation {
  id: number;
  date: string;
  evaluated: number;
  evaluationFilter: any;
  name: string;
  type: string;
}
