import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';
import { StaffPagination } from '../models/staff-pagination.model';
import { Factores } from '../models/factores.model';
import { MonitoringEvaluation } from '../models/monitoring-evaluation.model';
import { LocalstorageService } from './localstorage.service';
import { LocalStorageKeys } from '../constants/localstorage-keys';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  monitoringEvaluation?: MonitoringEvaluation;
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

  public getAssessmentMonitoring(): Observable<Factores[]> {
    return this.http.get<Factores[]>('./assets/data/rubrics.json');
  }

  public setMonitoringEvaluation(monitoringEvaluation: MonitoringEvaluation) {
    this.monitoringEvaluation = monitoringEvaluation;
  }

  public getMonitoringEvaluation(date: string, staff: string) {
    if (!this.monitoringEvaluation) {
      const school = this.localStorageService.getObject(
        LocalStorageKeys.SCHOOL
      ).id;
      if (!school) return null;
      const monitoringEvaluation = this.localStorageService.getObject(
        `monitoring-${date}-${school}-${staff}`
      );
      if (monitoringEvaluation) {
        this.monitoringEvaluation = monitoringEvaluation;
      }
    }
    return this.monitoringEvaluation || null;
  }
}
