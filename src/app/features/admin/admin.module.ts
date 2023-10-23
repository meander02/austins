import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListView } from './views/product-list/product-list.view';
import { ProductCreateView } from './views/product-create/product-create.view';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    ProductListView,
    ProductCreateView,
    AdminComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
