import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';

import { MonthYearPickerData } from './@types';

export enum MonthYearPickerSelectionMode {
  year,
  month,
}

export interface MonthYearPickerState {
  value: MonthYearPickerData;
}

@Injectable()
export class MonthYearPickerStore extends ComponentStore<MonthYearPickerState> {
  public readonly value$ = this.select((s) => s.value);
  public readonly year$ = this.value$.pipe(map((v) => v.year));
  public readonly month$ = this.value$.pipe(map((v) => v.month));

  constructor() {
    super({
      value: {
        year: 1957,
        month: 1,
      },
    });
  }

  public next(): void {
    this.setState((state) => {
      let { year, month } = state.value;

      if (month < 12) month++;
      else {
        month = 1;
        year++;
      }

      const value = {
        year,
        month,
      };

      return {
        ...state,
        value: value,
      };
    });
  }

  public previous(): void {
    this.setState((state) => {
      let { year, month } = state.value;

      if (month > 1) month--;
      else {
        month = 12;
        year--;
      }

      const value = {
        year,
        month,
      };

      return {
        ...state,
        value,
      };
    });
  }

  public setValue(value: MonthYearPickerData): void {
    this.setState((state) => {
      return {
        ...state,
        value,
      };
    });
  }
}
