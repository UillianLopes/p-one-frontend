import { WeekDay } from '@angular/common';

import { EEntryRecurrence } from '../enums';
import { CreateEntryRequest } from './create-entry.request';

export interface CreateRecurrentEntryRequest extends CreateEntryRequest {
  begin: Date;
  end: Date;
  recurrence: EEntryRecurrence;
  dayOfMonth?: number;
  dayOfWeek?: WeekDay;
}
