import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminGuard } from './core/guards/is-admin.guard';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal',
    pathMatch: 'full',
  },
  {
    path: 'portal',
    loadChildren: () =>
      import('./features/portal/portal.module').then((m) => m.PortalModule),
  },
  {
    path: 'admin',
    canActivate: [isAdminGuard, isAuthenticatedGuard],
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'payment',
    // canActivate:[isAuthenticatedGuard],
    loadChildren: () =>
      import('./features/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    title:"home",
    path: '**',
    redirectTo: 'portal',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
