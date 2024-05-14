import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'assessment',
        loadComponent: () =>
          import(
            '../pages/evaluate-monitoring/evaluate-monitoring.component'
          ).then((c) => c.EvaluateMonitoringComponent),
      },
      {
        path: 'assessment/:date/:staff',
        loadComponent: () =>
          import(
            '../pages/evaluate-monitoring/evaluation/evaluation.component'
          ).then((c) => c.EvaluationComponent),
      },
      {
        path: 'assessment-certification',
        loadComponent: () =>
          import(
            '../pages/evaluate-certification/evaluate-certification.component'
          ).then((c) => c.EvaluateCertificationComponent),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
