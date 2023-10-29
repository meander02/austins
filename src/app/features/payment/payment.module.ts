import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { CartView } from './views/cart/cart.view';
import { PaymentRoutingModule } from './payment-routing.module';



@NgModule({
  declarations: [CartView, PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
