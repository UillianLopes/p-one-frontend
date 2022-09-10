import { WeekDay } from '@angular/common';
import { EEntryRecurrence } from '@p-one/domain/financial';

export interface RecurrenceFormModel {
  recurrence: EEntryRecurrence;
  begin: Date;
  end: Date;
  dayOfWeek: WeekDay;
  dayOfMonth: number;
}
