import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { School } from 'src/app/core/models/school.model';
import { AssessmentService } from 'src/app/core/services/assessment.service';
import {
  Staff,
  StaffPagination,
} from 'src/app/core/models/staff-pagination.model';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { LocalStorageKeys } from 'src/app/core/constants/localstorage-keys';
import { DateTimeHelper } from 'src/app/core/utils/DateTimeHelper';
import { Router } from '@angular/router';
import { MonitoringEvaluation } from 'src/app/core/models/monitoring-evaluation.model';

@Component({
  selector: 'app-evaluate-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorComponent,
  ],
  templateUrl: './evaluate-monitoring.component.html',
  styleUrls: ['./evaluate-monitoring.component.scss'],
})
export class EvaluateMonitoringComponent {
  date = new Date();
  schools: School[] = [];
  pageIndex = 0;
  pageOffset = 10;
  total = 0;
  staff = new MatTableDataSource<Staff>();
  displayedColumns = ['id', 'staff', 'estado'];
  loadingPage = true;
  schoolSelected?: School;
  staffSelected?: Staff;
  private assessmentService = inject(AssessmentService);
  private localStorageService = inject(LocalstorageService);
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
      this.schools = schools;
      this.schoolSelected = schools[0];
      this.localStorageService.setObject(
        LocalStorageKeys.SCHOOL,
        this.schoolSelected
      );
      this.getStaff();
      this.loadingPage = false;
    });
  }

  getStaff() {
    this.loadingPage = true;
    this.assessmentService
      .getStaffJson(this.pageIndex)
      .subscribe((staffJson) => {
        this.staff.data = staffJson.data.map((staff) => {
          const monitoringName = this.getEvaluationMonitoringName(staff);
          return {
            ...staff,
            evaluacion: this.localStorageService.getObject(monitoringName)
              .evaluation
              ? 1
              : 0,
          };
        });
        this.total = staffJson.totalItems;
        this.loadingPage = false;
      });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value!;
  }

  onSchoolChange(event: any) {
    this.schoolSelected = event.value;
    this.localStorageService.setObject(
      LocalStorageKeys.SCHOOL,
      this.schoolSelected
    );
    this.getStaff();
  }

  evaluarStaff(staff: Staff) {
    if (!this.schoolSelected) return;
    const date = DateTimeHelper.formatDateToString(this.date);
    const monitoringName = this.getEvaluationMonitoringName(staff);
    const monitoringEvaluation: MonitoringEvaluation = {
      id: this.schoolSelected.id,
      date,
      evaluation: null,
      nombre: this.schoolSelected.nombre,
      staff,
    };

    this.assessmentService.setMonitoringEvaluation(monitoringEvaluation);
    localStorage.setItem(monitoringName, JSON.stringify(monitoringEvaluation));
    this.router.navigate(['/assessment', date, staff.id]);
  }

  getEvaluationMonitoringName(staff: Staff) {
    return `monitoringEvaluation-${DateTimeHelper.formatDateToString(
      this.date
    )}-${this.schoolSelected?.id}-${staff.id}`;
  }
}
