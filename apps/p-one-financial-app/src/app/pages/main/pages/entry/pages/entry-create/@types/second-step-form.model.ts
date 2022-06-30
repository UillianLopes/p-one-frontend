import {
  EEntryRecurrence,
  EEntryValueDistribuition,
} from '@p-one/domain/financial';

export interface SecondStepFormModel {
  value: number;
  dueDate: Date;
  recurrence: EEntryRecurrence;
  day: number;
  intervalInDays: number;
  times: number;
  valueDistribuition: EEntryValueDistribuition;
  barCode: string;
}
