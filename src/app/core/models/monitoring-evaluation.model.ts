import { Factores } from './factores.model';
import { Staff } from './staff-pagination.model';

export interface MonitoringEvaluation {
  id: number;
  date: string;
  evaluation: Factores[] | null;
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
