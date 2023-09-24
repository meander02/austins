import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListView } from './views/product-list/product-list.view';
import { ProductCreateView } from './views/product-create/product-create.view';


@NgModule({
  declarations: [
    ProductListView,
    ProductCreateView
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
