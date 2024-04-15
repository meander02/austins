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
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
// import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { KnobModule } from 'primeng/knob';
import { InputOtpModule } from 'primeng/inputotp';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';

import { TabViewModule } from 'primeng/tabview';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
@NgModule({
  imports: [MessagesModule,ProgressSpinnerModule,MatSnackBarModule,ToastModule,StepsModule,BreadcrumbModule,MatTabsModule,InputTextModule,CalendarModule,DropdownModule,InputMaskModule,PasswordModule,CheckboxModule,KnobModule,InputOtpModule,ConfirmPopupModule,DialogModule,TabViewModule], // Agrega FormsModule a los imports

  exports: [MessagesModule,ProgressSpinnerModule,TabViewModule,DialogModule,MatSnackBarModule,ToastModule,StepsModule,BreadcrumbModule, FormsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule, MatDatepickerModule, MatNativeDateModule,MatSelectModule,MatTabsModule,InputTextModule,CalendarModule,DropdownModule,InputMaskModule,PasswordModule,CheckboxModule,KnobModule,InputOtpModule,ConfirmPopupModule],

})
export class MaterialModule { }
