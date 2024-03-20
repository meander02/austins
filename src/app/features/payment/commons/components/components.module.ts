import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success/success.component';
import { OrderComponent } from './order/order.component';
import { DividerModule } from 'primeng/divider';
import { MaterialModule } from '../material/material.module';
const COMPONENTES = [SuccessComponent,OrderComponent];

@NgModule({
  declarations: [...COMPONENTES],
  exports: [...COMPONENTES],
  imports: [CommonModule,MaterialModule],
})
export class PAYComponentsModule {}
