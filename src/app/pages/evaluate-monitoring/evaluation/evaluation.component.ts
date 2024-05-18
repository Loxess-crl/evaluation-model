import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentService } from 'src/app/core/services/assessment.service';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { Factores, Indicador, Valor } from 'src/app/core/models/factores.model';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageKeys } from 'src/app/core/constants/localstorage-keys';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
})
export class EvaluationComponent {
  private assessmentService = inject(AssessmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sidenavService = inject(SidenavService);
  private snackBar = inject(MatSnackBar);
  private dateCurrent = this.route.snapshot.params['date'];
  private staffCurrent = this.route.snapshot.params['staff'];
  public monitoringEvaluation = this.assessmentService.getMonitoringEvaluation(
    this.dateCurrent,
    this.staffCurrent
  );
  public evaluator = localStorage.getItem(LocalStorageKeys.USERNAME);
  public rubrics: Factores[] = [];
  public recomendationsForm = new FormGroup({});
  public percent = 0;
  public percent_class = 'bg-red';
  displayedColumns = [
    'Factor',
    'Indicator',
    'State',
    'Rubric',
    'Findings and recomendations',
  ];

  ngOnInit() {
    if (!this.monitoringEvaluation?.id) {
      this.router.navigate(['assessment']);
      return;
    }
    if (this.monitoringEvaluation?.evaluation) {
      this.rubrics = this.monitoringEvaluation.evaluation;
      this.calculatePercentage();
      this.rubrics.forEach((rubric) => {
        this.recomendationsForm.addControl(
          rubric.factor,
          new FormControl(rubric.recomendacion)
        );
      });
    } else {
      this.getRubrics();
    }
  }

  trackByfn(index: any, item: Factores) {
    return item.idevaluacion;
  }
  getRubrics() {
    this.assessmentService.getAssessmentMonitoring().subscribe((res) => {
      this.rubrics = res;
      this.rubrics.forEach((rubric) => {
        this.recomendationsForm.addControl(
          rubric.factor,
          new FormControl(rubric.recomendacion)
        );
      });
    });
  }

  onSelectValor(valor: Valor, indicator: Indicador) {
    indicator.valores.forEach((v) => {
      v.dato = 0;
    });
    valor.dato = 1;

    this.calculatePercentage();
  }
  rubricSelectedDesc(indicator: Indicador) {
    return indicator.valores.find((val) => val.dato === 1)?.descripcion ?? '';
  }

  currentValue(indicator: Indicador) {
    return indicator.valores.find((val) => val.dato === 1);
  }

  calculatePercentage() {
    let total = 0;
    let totalMax = 0;
    this.rubrics.forEach((rubric) => {
      rubric.indicadores.forEach((indicator) => {
        total += indicator.valores.find((val) => val.dato === 1)?.valor ?? 0;
        totalMax += indicator.valores.at(-1)?.valor ?? 0;
      });
    });
    this.percent = Math.floor((total / totalMax) * 100);
    this.calculateBgPercent();
  }

  calculateBgPercent() {
    if (this.percent <= 50) return (this.percent_class = 'bg-red');
    if (this.percent <= 75) return (this.percent_class = 'bg-orange');
    if (this.percent <= 90) return (this.percent_class = 'bg-yellow');
    return (this.percent_class = 'bg-green');
  }

  saveEvaluation() {
    const date = this.dateCurrent;
    const school = this.monitoringEvaluation?.id;
    const staff = this.staffCurrent;
    this.rubrics.forEach((rubric) => {
      rubric.recomendacion = this.recomendationsForm.get(rubric.factor)?.value;
    });
    this.monitoringEvaluation!.evaluation = this.rubrics;
    localStorage.setItem(
      `monitoringEvaluation-${date}-${school}-${staff}`,
      JSON.stringify(this.monitoringEvaluation)
    );
    this.sidenavService.addCertification('evaluations');
    this.snackBar.open('Saved Accreditation Assessment', 'Close', {
      duration: 5000,
    });
  }
}
