import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/core/services/assessment.service';
import {
  CertificationRequirement,
  FilterAssessmentCertification,
} from 'src/app/core/models/monitoring-evaluation.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
})
export class EvaluationComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assessmentService = inject(AssessmentService);
  private school = this.route.snapshot.params['school'];
  private date = this.route.snapshot.params['date'];
  public filterAssessmentCertification!: FilterAssessmentCertification;
  public displayedColumns = ['id', 'requirement', 'estado'];
  public requirementSelected?: CertificationRequirement;

  public assessmentCertification =
    this.assessmentService.getAssessmentCertification(this.school, this.date);

  ngOnInit() {
    if (!this.assessmentCertification.id) {
      this.router.navigate(['assessment-certification']);
      return;
    }
    this.getFilterAssessmentCertification();
  }

  getFilterAssessmentCertification() {
    this.assessmentService
      .getFilterAssessmentCertification()
      .subscribe((data) => {
        this.filterAssessmentCertification = data;
      });
  }
}
