import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { MatChipGrid } from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
@NgModule({
  exports: [
    PanelModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    AccordionModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,MatChipsModule,MatProgressSpinnerModule

  ],
})
export class MaterialModule {}
