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

  constructor() {}

  changeOverlay() {
    this.config.next({
      overlay: !this.config.value.overlay,
    });
  }
}
