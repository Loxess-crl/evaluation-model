import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    RouterModule,
  ],
  standalone: true,
})
export class NavbarComponent {
  notifications = 0;
  notificationList = [];

  private authService = inject(AuthService);
  private sidenavService = inject(SidenavService);

  overlay() {
    this.sidenavService.changeOverlay();
  }

  logout() {
    this.authService.logout();
  }
}
