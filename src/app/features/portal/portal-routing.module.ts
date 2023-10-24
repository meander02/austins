import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal.component';
import { HomeViews } from './views/home/home.views';
import { PoliticaPrivView } from './views/politica-priv/politica-priv.view';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
import { DetailViews } from './views/detail/detail.views';

const routes: Routes = [
  {
    path:'',redirectTo:'home' ,pathMatch:'full'
  },
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'home',

        component: HomeViews,
      },
      {
        path: 'detail',
        component: DetailViews,
      },
      {
        title:"Politica |",
        path: 'politica',
        component: PoliticaPrivView,
      },
      {
        title:"Acerca de |",
        path: 'acercade',
        component: AcercaDeView,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
