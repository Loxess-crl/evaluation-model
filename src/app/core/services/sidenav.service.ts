import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface Config {
  overlay: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  config = new BehaviorSubject<Config>({
    overlay: false,
  });

  certifications = new BehaviorSubject<{
    assessments: number;
    evaluations: number;
  }>({
    assessments: 0,
    evaluations: 0,
  });

  constructor() {}

  changeOverlay() {
    this.config.next({
      overlay: !this.config.value.overlay,
    });
  }

  addCertification(type: 'assessments' | 'evaluations') {
    const certifications = this.certifications.value;
    certifications[type]++;
    this.certifications.next(certifications);
  }
}
