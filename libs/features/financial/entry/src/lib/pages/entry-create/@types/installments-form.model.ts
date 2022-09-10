import { WeekDay } from '@angular/common';
import { MonthModel } from '@p-one/core';
import { EEntryRecurrence, EEntryValueDistribuition } from '@p-one/domain/financial';

export interface InstallmentsFormModel {
  recurrence: EEntryRecurrence;
  day: number;
  installments: number;
  valueDistribuition: EEntryValueDistribuition;
  barCode: string;
  dayOfWeek: WeekDay;
  month: MonthModel;
}
