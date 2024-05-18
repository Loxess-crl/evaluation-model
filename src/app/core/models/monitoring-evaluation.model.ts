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

export interface CertificationEvaluationResponse {
  currentPage: number;
  data: CertificationEvaluation[];
  totalItems: number;
  totalPages: number;
}

export interface FilterAssessmentCertification {
  finding: string;
  recommendation: string;
  certifications: AssessmentCertification[];
}

export interface AssessmentCertification {
  id: number;
  name: string;
  description: string;
  notRequest: boolean;
  hasCertificate: boolean;
  show: boolean;
  requirements: CertificationRequirement[];
}

export interface CertificationRequirement {
  id: number;
  name: string;
  porcentage: number;
}
