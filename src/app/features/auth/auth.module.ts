import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInView } from './views/sign-in/sign-in.view';
import { SignUpView } from './views/sign-up/sign-up.view';
import { AuthCommonsModule } from './commons/commons.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/shared/interceptor/error.interceptor';
import { MaterialModule } from './commons/material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SuccessView } from './views/success/success.view';
import { CoreComponentsModule } from 'src/app/core/components/components.module';
import { RequestPasswordRecoveryView } from './views/request-password-recovery/request-password-recovery.view';

import { NgxCaptchaModule } from 'ngx-captcha';
import { PreguntaSecretView } from './views/pregunta-secret/pregunta-secret.view';
import { ActivateCountComponent } from './views/activate-count/activate-count.component';




@NgModule({
  declarations: [
    AuthComponent,
    SignInView,
    SignUpView,
    SuccessView,RequestPasswordRecoveryView, PreguntaSecretView, ActivateCountComponent,
  ],
  imports: [
    
    NgxCaptchaModule,
    CoreComponentsModule,
    MatSnackBarModule,
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    AuthCommonsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  
})
export class AuthModule { }
