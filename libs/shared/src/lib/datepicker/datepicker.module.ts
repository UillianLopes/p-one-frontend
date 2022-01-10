import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatepickerCalendarComponent } from './datepicker-calendar/datepicker-calendar.component';
import { DatepickerComponent } from './datepicker.component';
import { DatepickerDirective } from './datepicker.directive';

@NgModule({
  declarations: [
    DatepickerComponent,
    DatepickerDirective,
    DatepickerCalendarComponent,
  ],
  imports: [CommonModule],
  exports: [DatepickerCalendarComponent],
})
export class POneDatepickerModule {}
