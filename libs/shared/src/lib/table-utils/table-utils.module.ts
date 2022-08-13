import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneFlexModule } from '../flex/flex.module';
import { POneTooltipModule } from '../tooltip';
import {
  ActionsCellComponent,
  ActionsCellOptionsDirective,
  ActionsHeaderCellComponent,
} from './actions-cell/actions-cell.component';
import { EllipsisCellComponent } from './ellipsis-cell/ellipsis-cell.component';

@NgModule({
  declarations: [
    EllipsisCellComponent,
    ActionsCellComponent,
    ActionsHeaderCellComponent,
    ActionsCellOptionsDirective,
  ],
  imports: [
    CommonModule,
    POneTooltipModule,
    POneFlexModule,
  ],
  exports: [
    EllipsisCellComponent,
    ActionsCellComponent,
    ActionsHeaderCellComponent,
    ActionsCellOptionsDirective,
  ],
})
export class POneTableUtilsModule {}
