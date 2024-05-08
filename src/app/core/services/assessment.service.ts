import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school.model';
import { StaffPagination } from '../models/staff-pagination.model';
import { Factores } from '../models/factores.model';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private http: HttpClient) {}

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
}
