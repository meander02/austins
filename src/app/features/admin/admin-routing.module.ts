import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductListView } from './views/product-list/product-list.view';
import { ProductCreateView } from './views/product-create/product-create.view';

const routes: Routes = [
  {
    path:'',component:AdminComponent,children: [
      {
        path:"products-list",component:ProductListView
      },
      {
        path:"products-create",component:ProductCreateView
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
