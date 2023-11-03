import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { AuthServicesModule } from './services/services.module';
import { SignInService } from './services/sign-in.service';



@NgModule({
  declarations: [],
  exports:[
    AuthComponentsModule,
    AuthServicesModule,
    MaterialModule
  ],
  // providers: [SignInService],
})
export class AuthCommonsModule { }
