import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EllipsisDirective } from '../ellipsis';

import { POneFlexModule } from '../flex/flex.module';
import { POneTooltipModule } from '../tooltip';
import { MonthYearPickerSelectorComponent } from './month-year-picker-selector/month-year-picker-selector.component';
import { MonthYearPickerComponent } from './month-year-picker.component';

@NgModule({
  declarations: [MonthYearPickerComponent, MonthYearPickerSelectorComponent],
  imports: [CommonModule, POneTooltipModule, POneFlexModule, EllipsisDirective],
  exports: [MonthYearPickerComponent],
})
export class POneMonthYearPickerModule { }
