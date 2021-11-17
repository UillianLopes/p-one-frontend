import { EntryRecurrence, EntryValueDistribuition } from '@p-one/core';

export interface SecondStepFormModel {
  value: number;
  dueDate: Date;
  recurrence: EntryRecurrence;
  day: number;
  intervalInDays: number;
  times: number;
  valueDistribuition: EntryValueDistribuition;
}
