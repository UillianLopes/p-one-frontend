import { InjectionToken } from '@angular/core';

export enum DatepickerMode {
  SINGLE = 'SINGLE',
  RANGE = 'RANGE',
}
export const DATEPICKER_MODE = new InjectionToken<DatepickerMode>(
  'DATEPICKER_MODE'
);
