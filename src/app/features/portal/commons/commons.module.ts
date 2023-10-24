import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
// import { DefaultImgModule } from 'src/app/shared/pipe/default-img/default-img.module';



@NgModule({
  exports:[
    PortalComponentsModule,
    MaterialModule,
    // DefaultImgModule
    // PortalServicesModule,
  ]
})
export class PortalCommonsModule { }
