import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../shared/components/sidenav/sidenav.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    SidenavComponent,
    NavbarComponent,
  ],
})
export class HomeModule {}
