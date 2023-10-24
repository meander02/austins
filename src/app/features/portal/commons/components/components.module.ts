import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { DetailImgComponent } from './detail-img/detail-img.component';





import { MaterialModule } from '../material/material.module';
// import { DefaultImgModule } from 'src/app/shared/pipe/default-img/default-img.module';
import { ReactiveFormsModule } from '@angular/forms';
const COMPONENTS = [ProductComponent,DetailImgComponent, DetailInfoComponent]; // Agrega los componentes

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    // DefaultImgModule,
    // Agrega aquí otros módulos compartidos si es necesario
  ]
})
export class PortalComponentsModule { }
