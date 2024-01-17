import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInView } from './views/sign-in/sign-in.view';
import { SignUpView } from './views/sign-up/sign-up.view';
import { AuthCommonsModule } from './commons/commons.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/shared/interceptor/error.interceptor';


@NgModule({
  declarations: [
    AuthComponent,
    SignInView,
    SignUpView
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthCommonsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AuthModule { }
