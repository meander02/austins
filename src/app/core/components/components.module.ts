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
import { FormsModule } from '@angular/forms';
import { SignInService } from 'src/app/features/auth/commons/services/sign-in.service';
import { HttpClientModule } from '@angular/common/http';
import { CookiesComponent } from './cookies/cookies.component';
import { BtnFloatComponent } from './btn-float/btn-float.component';
// import {  } from './components.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PoliticaComponent,CookiesComponent, BtnFloatComponent,
  ],
  exports: [
    // PoliticaComponent,
    BtnFloatComponent,
    HeaderComponent,
    FooterComponent,PoliticaComponent,CookiesComponent
  ],
  imports: [
    // BrowserModule,
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatDialogModule,
    MatBadgeModule,
    HttpClientModule

  ],
  providers: [SignInService], // Asegúrate de incluir SignInService en la lista de providers.

})
export class CoreComponentsModule { }
