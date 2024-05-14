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

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
  ],
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
})
export class EvaluationComponent {
  private assessmentService = inject(AssessmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dateCurrent = this.route.snapshot.root.params['date'];
  private staffCurrent = this.route.snapshot.root.params['staff'];
  public monitoringEvaluation = this.assessmentService.getMonitoringEvaluation(
    this.dateCurrent,
    this.staffCurrent
  );
  public evaluator = localStorage.getItem(LocalStorageKeys.USERNAME);
  public rubrics: Factores[] = [];
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
    }
    console.log(this.monitoringEvaluation);

    this.getRubrics();
  }

  trackByfn(index: any, item: Factores) {
    return item.idevaluacion;
  }
  getRubrics() {
    this.assessmentService.getAssessmentMonitoring().subscribe((res) => {
      this.rubrics = res;
    });
  }

  onSelectValor(valor: Valor, indicator: Indicador) {
    indicator.valores.forEach((v) => {
      console.log(v);

      v.dato = 0;
    });
    valor.dato = 1;
  }
  rubricSelectedDesc(indicator: Indicador) {
    return indicator.valores.find((val) => val.dato === 1)?.descripcion ?? '';
  }
}
