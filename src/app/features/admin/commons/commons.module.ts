import {  AdminComponentModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { ADMINServicesModule } from './services/services.module';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [],
  exports:[AdminComponentModule,ADMINServicesModule,MaterialModule],

})
export class AdminCommonsModule { }
