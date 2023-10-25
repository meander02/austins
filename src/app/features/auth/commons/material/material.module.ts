import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
// import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [], // Agrega FormsModule a los imports

  exports: [ FormsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule],

})
export class MaterialModule { }
