import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
// import { BrowserModule } from '@angular/platform-browser';
//
// import { FormsModule } from '@angular/forms';
//

@NgModule({
  exports: [MatCardModule, MatIconModule,MatFormFieldModule, MatButtonModule, MatInputModule],
})
export class MaterialModule {}
