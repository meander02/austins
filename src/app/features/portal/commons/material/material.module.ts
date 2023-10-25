import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { BrowserModule } from '@angular/platform-browser';
//
// import { FormsModule } from '@angular/forms';
//



@NgModule({
  exports: [ MatCardModule,MatFormFieldModule,MatButtonModule,MatInputModule],

})
export class MaterialModule { }
