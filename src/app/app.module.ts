import { CoreComponentsModule } from './core/components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CssStyleClass } from '@fortawesome/fontawesome-svg-core';
// import { SignInService } from './features/auth/commons/services/sign-in.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
