import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductListView } from './views/product-list/product-list.view';
// import { ProductCreateView } from './views/product-create/product-create.view';
import { AdminComponent } from './admin.component';
import { AdminCommonsModule } from './commons/commons.module';
import { AdminComponentModule } from './commons/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      AdminComponent,
      ProductListView
    ],
    imports: [ReactiveFormsModule,FormsModule,CommonModule, AdminCommonsModule,AdminRoutingModule]
})
export class AdminModule {}
