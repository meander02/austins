import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInView } from './views/sign-in/sign-in.view';
import { SignUpView } from './views/sign-up/sign-up.view';
import { SuccessView } from './views/success/success.view';
import { ErrorVerficaView } from './views/error-verfica/error-verfica.view';
import { UserCreateView } from './views/user-create/user-create.view';
import { RequestPasswordRecoveryView } from './views/request-password-recovery/request-password-recovery.view';
import { PreguntaSecretView } from './views/pregunta-secret/pregunta-secret.view';
import { ActivateCountComponent } from './views/activate-count/activate-count.component';

const routes: Routes = [
  {
    path:'',redirectTo:'sign-up' ,pathMatch:'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [

      {
        path: 'sign-up',
        component: SignUpView,
      }
      ,     {
        path: 'sign-in',
        component: SignInView,
      },
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
      {
        path: 'Recupera',
        component: RequestPasswordRecoveryView,
      },
      {
        path: 'Recupera-pregunta',
        component: PreguntaSecretView,
      },
      { path: 'activate/:token', component: ActivateCountComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
