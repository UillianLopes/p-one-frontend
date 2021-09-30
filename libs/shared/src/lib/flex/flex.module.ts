import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexColumnDirective } from './flex-column.directive';
import { FlexRowDirective } from './flex-row.directive';
import { FlexDirective } from './flex.directive';

@NgModule({
  declarations: [FlexColumnDirective, FlexRowDirective, FlexDirective],
  imports: [CommonModule],
  exports: [FlexColumnDirective, FlexRowDirective, FlexDirective],
})
export class POneFlexModule {}
