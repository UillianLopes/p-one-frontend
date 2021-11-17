import { EntryRecurrence, EntryValueDistribuition } from '../enums';

export interface BuildEntryReccurrenceRequest {
  recurrence: EntryRecurrence;
  times: number;
  intervalInDays: number;
  day: number;
  dueDate: Date;
  value: number;
  valueDistribuition: EntryValueDistribuition;
}
