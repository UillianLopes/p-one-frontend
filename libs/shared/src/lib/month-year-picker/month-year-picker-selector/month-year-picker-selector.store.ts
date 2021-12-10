import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';

import { MonthYearPickerData } from '../@types';
import { MonthYearPickerMode } from '../@types/month-year-picker-mode.enum';

export interface MonthYearPickerSelectorState {
  mode: MonthYearPickerMode;
  value: MonthYearPickerData;
}

@Injectable()
export class MonthYearPickerSelectorStore extends ComponentStore<MonthYearPickerSelectorState> {
  public readonly value$ = this.select((s) => s.value);
  public readonly year$ = this.value$.pipe(map((v) => v.year));
  public readonly month$ = this.value$.pipe(map((v) => v.month));

  public readonly mode$ = this.select((s) => s.mode);

  constructor() {
    super({
      mode: MonthYearPickerMode.month,
      value: {
        year: 1957,
        month: 1,
      },
    });
  }

  public nextYear() {
    this.setState((state) => {
      const { year, month } = state.value;

      const value = {
        month,
        year: year + 1,
      };

      return {
        ...state,
        value,
      };
    });
  }

  public previousYear() {
    this.setState((state) => {
      const { year, month } = state.value;

      const value = {
        month,
        year: year - 1,
      };

      return {
        ...state,
        value,
      };
    });
  }

  public nextMonth() {
    this.setState((state) => {
      const { year, month } = state.value;

      const value = {
        month: month < 12 ? month + 1 : 1,
        year,
      };

      return {
        ...state,
        value,
      };
    });
  }

  public previousMonth() {
    this.setState((state) => {
      const { year, month } = state.value;

      const value = {
        month: month > 1 ? month - 1 : 12,
        year,
      };

      return {
        ...state,
        value,
      };
    });
  }

  public setMode(mode: MonthYearPickerMode) {
    this.setState((state) => {
      return {
        ...state,
        mode,
      };
    });
  }

  public setYear(year: number) {
    this.setState((state) => {
      return {
        ...state,
        value: {
          ...state.value,
          year,
        },
      };
    });
  }
  public setMonth(month: number) {
    this.setState((state) => {
      return {
        ...state,
        value: {
          ...state.value,
          month,
        },
      };
    });
  }

  public setValue(value: MonthYearPickerData) {
    this.setState((state) => {
      return {
        ...state,
        value,
      };
    });
  }
}
