import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { TooltipRef } from '../../tooltip';
import { MonthYearPickerData } from '../@types';
import { MonthYearPickerMode } from '../@types/month-year-picker-mode.enum';

export interface MonthYearPickerSelectorState {
  mode: MonthYearPickerMode;
  value?: MonthYearPickerData;

  year: number;
  month: number;
}

@Injectable()
export class MonthYearPickerSelectorStore extends ComponentStore<MonthYearPickerSelectorState> {
  public readonly mode$ = this.select(({ mode }) => mode);
  public readonly value$ = this.select(({ value }) => value);
  public readonly year$ = this.select(({ year }) => year);
  public readonly month$ = this.select(({ month }) => month);

  constructor() {
    super({
      mode: MonthYearPickerMode.month,
      year: 1957,
      month: 1,
    });
  }

  public readonly setTooltipRef = this.updater(
    (state, tooltipRef: TooltipRef) => {
      return {
        ...state,
        tooltipRef,
      };
    }
  );

  public readonly nextYear = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.year$),
      tap(([_, year]) => this.setYear(year + 1))
    )
  );

  public readonly previousYear = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.year$),
      tap(([_, year]) => this.setYear(year - 1))
    )
  );

  public readonly nextMonth = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.month$),
      tap(([_, month]) => {
        this.setMonth(month < 12 ? month + 1 : 1);
      })
    )
  );

  public readonly previousMonth = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.month$),
      tap(([_, month]) => {
        this.setMonth(month > 12 ? month - 1 : 12);
      })
    )
  );

  public readonly setMode = this.updater((state, mode: MonthYearPickerMode) => {
    return {
      ...state,
      mode,
    };
  });

  public readonly setYear = this.updater((state, year: number) => {
    return {
      ...state,
      year,
      mode: MonthYearPickerMode.month,
    };
  });

  public readonly setMonth = this.updater((state, month: number) => {
    return {
      ...state,
      month,
    };
  });

  public readonly setMonthAndConfirm = this.effect(
    (event$: Observable<number>) =>
      event$.pipe(
        withLatestFrom(this.year$),
        tap(([month]) => this.setMonth(month)),
        tap(([month, year]) => this.setValue({ year, month }))
      )
  );

  public readonly setValue = this.updater(
    (state, value: MonthYearPickerData) => {
      return {
        ...state,
        value,
        year: value.year,
        month: value.month,
      };
    }
  );
}
