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
// import { SkeletonModule } from 'primeng/skeleton';
import { CarouselModule } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
// import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { SkeletonModule } from 'primeng/skeleton';
@NgModule({
  exports: [ConfirmPopupModule,CardModule,SplitterModule,ButtonModule,SkeletonModule,MatCardModule, MatIconModule,MatFormFieldModule, MatButtonModule, MatInputModule,CarouselModule,InputTextModule,InputNumberModule],
})
export class MaterialModule {}
