import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridColumnDirective } from './grid-column.directive';
import { GridRowDirective } from './grid-row.directive';
import { GridDirective } from './grid.directive';

@NgModule({
  declarations: [GridDirective, GridColumnDirective, GridRowDirective],
  imports: [CommonModule],
  exports: [GridDirective, GridColumnDirective, GridRowDirective],
})
export class POneGridModule {}
