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
  pageOffset = 0;
  total = 0;
  staff = new MatTableDataSource<Staff>();
  displayedColumns = ['id', 'staff', 'estado'];
  loadingPage = true;
  private assessmentService = inject(AssessmentService);
  private _unsubscribeAll = new Subject();

  @ViewChild(PaginatorComponent, { static: true })
  paginator: PaginatorComponent = new PaginatorComponent();

  ngAfterViewInit(): void {
    this.paginator.paginate
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((paginator) => {
        this.pageIndex = paginator.page;
        this.pageOffset = paginator.pageOffset;
        this.getStaff();
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
      this.loadingPage = false;
    });
  }

  getStaff() {
    this.loadingPage = true;
    this.assessmentService
      .getStaffJson(this.pageIndex)
      .subscribe((staffJson) => {
        this.staff.data = staffJson.data;
        this.total = staffJson.totalItems;
        this.loadingPage = false;
      });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value!;
  }

  evaluarStaff(staff: Staff) {
    /* zd */
  }
}
