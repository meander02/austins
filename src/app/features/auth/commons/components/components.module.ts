import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';


@NgModule({
  declarations: [
    SignInFormComponent
  ],
  exports:[
    SignInFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule
  ],
})
export class AuthComponentsModule { }
