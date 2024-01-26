import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInView } from './views/sign-in/sign-in.view';
import { SignUpView } from './views/sign-up/sign-up.view';
import { SuccessView } from './views/success/success.view';
import { ErrorVerficaView } from './views/error-verfica/error-verfica.view';
import { UserCreateView } from './views/user-create/user-create.view';

const routes: Routes = [
  {
    path:'',redirectTo:'sign-in' ,pathMatch:'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInView,
      },
      {
        path: 'sign-up',
        component: SignUpView,
      }
      ,
      {
        path: 'success',
        component: SuccessView,
      },

      {
        path: 'error-verificacion',
        component: ErrorVerficaView,
      },
      {
        path: 'user-create',
        component: UserCreateView,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
