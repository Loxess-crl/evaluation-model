import { Component, inject } from '@angular/core';
import { SidenavService } from '../core/services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public sidenavService = inject(SidenavService);
  closed = false;

  ngOnInit() {
    this.sidenavService.config.subscribe((config) => {
      this.closed = config.overlay;
    });
  }
}
