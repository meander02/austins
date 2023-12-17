import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { DefaultImgModule } from 'src/app/shared/pipes/default-img/default-img.module';
// import { DefaultImgModule } from 'src/app/shared/pipe/default-img/default-img.module';



@NgModule({
  declarations:[
    // FilterPipe
  ],
  exports:[
    PortalComponentsModule,
    MaterialModule,
    DefaultImgModule
    // PortalServicesModule,
  ],

})
export class PortalCommonsModule { }
