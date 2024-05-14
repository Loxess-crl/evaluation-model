import { Staff } from './staff-pagination.model';

export interface MonitoringEvaluation {
  id: number;
  date: string;
  evaluation: any;
  nombre: string;
  staff: Staff;
}
