import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-evaluate-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './evaluate-monitoring.component.html',
  styleUrls: ['./evaluate-monitoring.component.scss'],
})
export class EvaluateMonitoringComponent {
  date = new Date();

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value!;
  }
}
