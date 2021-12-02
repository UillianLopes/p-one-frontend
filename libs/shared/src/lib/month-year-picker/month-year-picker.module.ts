import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneTooltipModule } from '../tooltip';
import { MonthYearPickerComponent } from './month-year-picker.component';

@NgModule({
  declarations: [MonthYearPickerComponent],
  imports: [CommonModule, POneTooltipModule],
  exports: [MonthYearPickerComponent],
})
export class POneMonthYearPickerModule {}
