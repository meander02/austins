import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {   HttpClientModule } from '@angular/common/http';
import { SignInService } from './sign-in.service';

@NgModule({
  declarations: [],
  imports:[
    HttpClientModule
  ],
  // providers: [SignInService],
})
export class AuthServicesModule { }
