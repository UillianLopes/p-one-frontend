import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneMonthYearPickerModule } from '../month-year-picker';
import { DatepickerCalendarComponent } from './datepicker-calendar/datepicker-calendar.component';
import { DatepickerDayComponent } from './datepicker-day/datepicker-day.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import { RangeDatepickerComponent } from './range-datepicker/range-datepicker.component';

@NgModule({
  declarations: [
    DatepickerComponent,
    DatepickerDirective,
    DatepickerCalendarComponent,
    DatepickerDayComponent,
    RangeDatepickerComponent,
  ],
  imports: [
    CommonModule,
    POneMonthYearPickerModule,
    PortalModule,
    OverlayModule,
  ],
  exports: [
    RangeDatepickerComponent,
    DatepickerDirective
  ],
})
export class POneDatepickerModule {}
