import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatepickerCalendarComponent } from './datepicker-calendar/datepicker-calendar.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';
import { DatepickerDayComponent } from './datepicker-day/datepicker-day.component';

@NgModule({
  declarations: [
    DatepickerComponent,
    DatepickerDirective,
    DatepickerCalendarComponent,
    DatepickerDayComponent,
  ],
  imports: [CommonModule],
  exports: [DatepickerCalendarComponent],
})
export class POneDatepickerModule {}
