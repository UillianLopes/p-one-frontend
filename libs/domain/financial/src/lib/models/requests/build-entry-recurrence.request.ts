import { WeekDay } from '@angular/common';
import { MonthModel } from '@p-one/core';

import { EEntryRecurrence, EEntryValueDistribuition } from '../enums';

export interface BuildEntryReccurrenceRequest {
  recurrence: EEntryRecurrence;
  installments: number;
  day: number;
  value: number;
  dayOfWeek: WeekDay;
  valueDistribuition: EEntryValueDistribuition;
  begin: MonthModel;
}
