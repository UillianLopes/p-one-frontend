import { EEntryRecurrence, EEntryValueDistribuition } from '../enums';

export interface BuildEntryReccurrenceRequest {
  recurrence: EEntryRecurrence;
  times: number;
  intervalInDays: number;
  day: number;
  dueDate: Date;
  value: number;
  valueDistribuition: EEntryValueDistribuition;
}
