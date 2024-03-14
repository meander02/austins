import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success/success.component';

const MATERIAL = [SuccessComponent];

@NgModule({
  declarations: [MATERIAL],

  exports: [...MATERIAL],
})
export class PAYComponentsModule {}
