import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { School } from 'src/app/core/models/school.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AssessmentService } from 'src/app/core/services/assessment.service';
import { DateTimeHelper } from 'src/app/core/utils/DateTimeHelper';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Subject, takeUntil } from 'rxjs';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  CertificationEvaluation,
  MonitoringEvaluation,
} from 'src/app/core/models/monitoring-evaluation.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-evaluate-certification',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    PaginatorComponent,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './evaluate-certification.component.html',
  styleUrls: ['./evaluate-certification.component.scss'],
})
export class EvaluateCertificationComponent {
  date = new Date();
  pageIndex = 0;
  pageOffset = 10;
  total = 0;
  schools = new MatTableDataSource<School>();
  displayedColumns = ['id', 'school', 'estado'];
  options = ['Diagnostico', 'Monitoreo', 'Control de Corte'];
  optionSelected = this.options.at(0);
  loadingPage = true;
  schoolSelected?: School;
  private assessmentService = inject(AssessmentService);
  private router = inject(Router);
  private _unsubscribeAll = new Subject();

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent = new PaginatorComponent();

  ngAfterViewInit(): void {
    this.paginator.paginate
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((paginator) => {
        this.pageIndex = paginator.page;
        this.pageOffset = paginator.pageOffset;
        this.getSchools();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getSchools() {
    this.loadingPage = true;
    this.assessmentService.getSchoolsJson().subscribe((schools) => {
      this.schools = new MatTableDataSource(schools);
      this.loadingPage = false;
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value!;
  }

  evaluarSchool(school: School) {
    const date = DateTimeHelper.formatDateToString(this.date);
    const monitoringName = this.getCertificationEvaluationName(school);
    const monitoringEvaluation: CertificationEvaluation = {
      id: school.id,
      date,
      evaluationFilter: null,
      name: school.nombre,
      evaluated: 0,
      type: 'Diagnostico',
    };

    this.assessmentService.setCertificationEvaluation(monitoringEvaluation);
    localStorage.setItem(monitoringName, JSON.stringify(monitoringEvaluation));
    this.router.navigate([
      '/assessment-certification',
      'filter-certification',
      school.id,
      date,
    ]);
  }

  getCertificationEvaluationName(school: School) {
    return `certificationEvaluation-${DateTimeHelper.formatDateToString(
      this.date
    )}-${school.id}`;
  }
}
