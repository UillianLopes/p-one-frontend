import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneTooltipModule } from '../tooltip';
import { EllipsisCellComponent } from './ellipsis-cell/ellipsis-cell.component';

@NgModule({
  declarations: [EllipsisCellComponent],
  imports: [CommonModule, POneTooltipModule],
  exports: [EllipsisCellComponent],
})
export class TableUtilsModule {}
