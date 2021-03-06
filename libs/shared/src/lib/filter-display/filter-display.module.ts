import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneChipModule } from '../chip';
import { POneTooltipModule } from '../tooltip';
import { POneTranslateModule } from '../translate/translate.module';
import { FilterDisplayComponent } from './filter-display.component';

@NgModule({
  declarations: [FilterDisplayComponent],
  imports: [
    CommonModule,
    POneChipModule,
    POneTooltipModule,
    POneTranslateModule,
  ],
  exports: [FilterDisplayComponent],
})
export class POneFilterDisplayModule {}
