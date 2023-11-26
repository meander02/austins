import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductListView } from './views/product-list/product-list.view';
// import { ProductCreateView } from './views/product-create/product-create.view';
import { InicioAdView } from './views/incio-ad/incio-ad.view';
const routes: Routes = [
  {
    path:'',redirectTo:'inicio' ,pathMatch:'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'inicio',
        component: InicioAdView,
      },
      {
          title:"product|",
        path: 'products-list',
        component: ProductListView,
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
