import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, tap, withLatestFrom } from 'rxjs/operators';

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
  public readonly year$ = this.value$.pipe(map(({ year }) => year));
  public readonly month$ = this.value$.pipe(map(({ month }) => month));

  constructor() {
    super({
      value: {
        year: 1957,
        month: 1,
      },
    });
  }

  public readonly previous = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.year$, this.month$),
      tap(([_, year, month]) => {
        this.setValue({
          year: month > 1 ? year : year - 1,
          month: month > 1 ? month - 1 : 12,
        });
      })
    )
  );

  public readonly next = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.year$, this.month$),
      tap(([_, year, month]) => {
        this.setValue({
          year: month < 12 ? year : year + 1,
          month: month < 12 ? month + 1 : 1,
        });
      })
    )
  );

  public readonly setYear = this.updater(
    ({ value, ...state }, year: number) => {
      return {
        ...state,
        value: {
          ...value,
          year,
        },
      };
    }
  );

  public readonly setMonth = this.updater(
    ({ value, ...state }, month: number) => {
      return {
        ...state,
        value: {
          ...value,
          month,
        },
      };
    }
  );

  public readonly setValue = this.updater(
    (state, value: MonthYearPickerData) => {
      return {
        ...state,
        value,
      };
    }
  );
}
