import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatBadgeModule} from '@angular/material/badge';
import { PoliticaComponent } from './politica/politica.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PoliticaComponent
  ],
  exports: [
    // PoliticaComponent,
    HeaderComponent,
    FooterComponent,PoliticaComponent
  ],
  imports: [
    // BrowserModule,

    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    MatBadgeModule
  ]
})
export class CoreComponentsModule { }
