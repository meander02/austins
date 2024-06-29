import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { CartView } from './views/cart/cart.view';
import { PaymentRoutingModule } from './payment-routing.module';
import { OrderDetailView } from './views/order-detail/order-detail.view';

import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
// import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PayCommonsModule } from './commons/commons.module';
import { paysuccess } from './views/pay-success/pay-success.view';
import { OrderviewView } from './views/orderview/orderview.view';
import { MaterialModule } from './commons/material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/shared/interceptor/error.interceptor';
import { AccepOrderComponent } from './views/accep-order/accep-order.component';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// import { QaComponent } from './views/qa/qa.component';

// import { OrderviewComponent } from './views/orderview/orderview.component';

const MATERIAL = [
  
  BreadcrumbModule,
  ButtonModule,
  DropdownModule,
  TooltipModule,
  InputTextareaModule,
  CardModule,
  DatePipe,
  InputTextModule,
  TabViewModule,
  CalendarModule,
  SelectButtonModule,
  ToastModule,
  ConfirmDialogModule,
  ConfirmPopupModule,
  TableModule,
  AccordionModule,
  CheckboxModule,
  FormsModule,
  RadioButtonModule,
];

@NgModule({
  declarations: [CartView, PaymentComponent, OrderDetailView,paysuccess, OrderviewView, AccepOrderComponent],
  imports: [
    ...MATERIAL,
    PaymentRoutingModule,
    CommonModule,
    PayCommonsModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicDialogModule,
    CoreComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class PaymentModule {}
