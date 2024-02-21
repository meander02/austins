import { CoreComponentsModule } from './core/components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CssStyleClass } from '@fortawesome/fontawesome-svg-core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxCaptchaModule } from 'ngx-captcha';
// import AOS from 'aos'; //AOS - 1
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [NgxCaptchaModule,
    MatSnackBarModule,
    NgxUiLoaderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreComponentsModule,HttpClientModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {



 }
