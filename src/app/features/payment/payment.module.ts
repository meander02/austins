import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartView } from './views/cart/cart.view';
import { OrderDetailView } from './views/order-detail/order-detail.view';



@NgModule({
  declarations: [
    CartView,
    OrderDetailView
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
