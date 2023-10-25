import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [],
  exports:[
    AuthComponentsModule,
    MaterialModule
  ],

})
export class AuthCommonsModule { }
