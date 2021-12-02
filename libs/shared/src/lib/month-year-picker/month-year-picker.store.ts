import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';

export interface MonthYearPickerData {
  month: number;
  year: number;
}

export interface MonthYearPickerState {
  value: MonthYearPickerData;
}

@Injectable()
export class MonthYearPickerStore extends ComponentStore<MonthYearPickerState> {
  public readonly value$ = this.select((s) => s.value);
  public readonly year$ = this.value$.pipe(map((d) => d.year));
  public readonly month$ = this.value$.pipe(map((d) => d.month));

  constructor() {
    super({
      value: {
        year: 1957,
        month: 1,
      },
    });
  }

  public next(afterUpdateCallback?: (v: MonthYearPickerData) => void): void {
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

      if (afterUpdateCallback) {
        afterUpdateCallback(value);
      }

      return {
        ...state,
        value: value,
      };
    });
  }

  public previous(
    afterUpdateCallback?: (v: MonthYearPickerData) => void
  ): void {
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
      
      if (afterUpdateCallback) {
        afterUpdateCallback(value);
      }

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
        value: {
          ...value,
        },
      };
    });
  }
}
