import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
// import { BrowserModule } from '@angular/platform-browser';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  imports: [MatSnackBarModule,ToastModule,StepsModule,BreadcrumbModule,MatTabsModule], // Agrega FormsModule a los imports

  exports: [MatSnackBarModule,ToastModule,StepsModule,BreadcrumbModule, FormsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule, MatDatepickerModule, MatNativeDateModule,MatSelectModule,MatTabsModule],

})
export class MaterialModule { }
