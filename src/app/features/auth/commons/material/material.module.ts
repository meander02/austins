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

@NgModule({
  imports: [MatSnackBarModule], // Agrega FormsModule a los imports

  exports: [MatSnackBarModule, FormsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule, MatDatepickerModule, MatNativeDateModule,MatSelectModule],

})
export class MaterialModule { }
