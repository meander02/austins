import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatBadgeModule} from '@angular/material/badge';
import { AdminHeaderComponent } from './admin-header/admin-header.component';


@NgModule({
  declarations: [

    AdminHeaderComponent
  ],
  exports: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatBadgeModule
  ]
})
export class AdminComponent{ }
