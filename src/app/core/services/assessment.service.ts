import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';
import { StaffPagination } from '../models/staff-pagination.model';
import { Factores } from '../models/factores.model';
import {
  CertificationEvaluation,
  CertificationEvaluationResponse,
  FilterAssessmentCertification,
  MonitoringEvaluation,
} from '../models/monitoring-evaluation.model';
import { LocalstorageService } from './localstorage.service';
import { LocalStorageKeys } from '../constants/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalstorageService
  ) {}

  public getSchoolsJson(): Observable<School[]> {
    return this.http.get<School[]>('./assets/data/school.json');
  }

  public getStaffJson(page: number = 0): Observable<StaffPagination> {
    return this.http.get<StaffPagination>(
      `./assets/data/school-staff-page${page}.json`
    );
  }

  public getAssessmentSchool(): Observable<CertificationEvaluationResponse> {
    return this.http.get<CertificationEvaluationResponse>(
      './assets/data/assessment-school.json'
    );
  }

  public getFilterAssessmentCertification(): Observable<FilterAssessmentCertification> {
    return this.http.get<FilterAssessmentCertification>(
      './assets/data/filter-assessment-certification.json'
    );
  }

  public getAssessmentMonitoring(): Observable<Factores[]> {
    return this.http.get<Factores[]>('./assets/data/rubrics.json');
  }

  public getMonitoringEvaluation(
    date: string,
    staff: string
  ): MonitoringEvaluation | null {
    const school = this.localStorageService.getObject(
      LocalStorageKeys.SCHOOL
    ).id;

    if (!school) return null;

    return (
      this.localStorageService.getObject(
        `monitoringEvaluation-${date}-${school}-${staff}`
      ) || null
    );
  }

  public getAssessmentCertification(
    school: string,
    date: string
  ): CertificationEvaluation {
    return this.localStorageService.getObject(
      `certificationEvaluation-${date}-${school}`
    );
  }
}
