import {  AdminComponentModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { ADMINServicesModule } from './services/services.module';
import { MaterialModule } from './material/material.module';
import { DefaultImgModule } from 'src/app/shared/pipes/default-img/default-img.module';


@NgModule({
  declarations: [],
  exports:[AdminComponentModule,ADMINServicesModule,MaterialModule,DefaultImgModule],

})
export class AdminCommonsModule { }
