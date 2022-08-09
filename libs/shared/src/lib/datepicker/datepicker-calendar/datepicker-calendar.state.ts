import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { DatepickerMode } from '../datepicker-mode.enum';
import { DatepickerData, RangepickerValue } from '../datepicker.data';

export interface DatepickerCalendarState {
  mode: DatepickerMode;
  today: Date;
  year: number;
  month: number;

  hover?: DatepickerData;

  begin?: DatepickerData;
  end?: DatepickerData;
  selected?: DatepickerData;

  value?: RangepickerValue | Date;
}

@Injectable()
export class DatepickerCalendarStore extends ComponentStore<DatepickerCalendarState> {
  public readonly today$ = this.select(({ today }) => today);
  public readonly year$ = this.select(({ year }) => year);
  public readonly month$ = this.select(({ month }) => month);
  public readonly begin$ = this.select(({ begin }) => begin);
  public readonly end$ = this.select(({ end }) => end);
  public readonly mode$ = this.select(({ mode }) => mode);
  public readonly hover$ = this.select(({ hover }) => hover);
  public readonly selected$ = this.select(({ selected }) => selected);

  public readonly monthAndYear$ = this.select(
    this.month$,
    this.year$,
    (month, year) => ({ month, year })
  );

  public readonly weeks$ = this.select(
    this.monthAndYear$,
    ({ year, month }) => {
      const weeks: number[][] = [];
      const firstDate = new Date(year, month - 1, 1);
      const lastDate = new Date(year, month, 0);
      const numDays = lastDate.getDate();

      let dayOfWeekCounter = firstDate.getDay();

      for (let date = 1; date <= numDays; date++) {
        if (dayOfWeekCounter === 0 || weeks.length === 0) {
          weeks.push([]);
        }
        const week = weeks[weeks.length - 1];
        week.push(date);

        dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        if (dayOfWeekCounter === 0 && week.length < 7) {
          const extraDays = Array.from(Array(7 - week.length));
          week.unshift(...extraDays);
        }
      }

      return weeks.filter((days) => days.length > 0).map((days) => days);
    }
  );

  public readonly value$ = this.select(({ value }) => value);

  constructor() {
    super({
      year: 2022,
      month: 1,
      today: new Date(),
      mode: DatepickerMode.SINGLE,
    });
  }

  public readonly setMode = this.updater((state, mode: DatepickerMode) => ({
    ...state,
    mode,
  }));

  public readonly nextMonth = this.effect((data$) =>
    data$.pipe(
      withLatestFrom(this.month$, this.year$),
      map(([_, month, year]) => [month, year]),
      tap(([month, year]) => {
        if (month < 12) this.setMonth(month + 1);
        else {
          this.setMonth(1);
          this.setYear(year + 1);
        }
      })
    )
  );

  public readonly previousMonth = this.effect((data$) =>
    data$.pipe(
      withLatestFrom(this.month$, this.year$),
      map(([_, month, year]) => [month, year]),
      tap(([month, year]) => {
        if (month > 1) this.setMonth(month - 1);
        else {
          this.setMonth(12);
          this.setYear(year - 1);
        }
      })
    )
  );

  public readonly nextYear = this.effect((data$) =>
    data$.pipe(
      withLatestFrom(this.year$),
      map(([_, year]) => year),
      tap((year) => this.setYear(year + 1))
    )
  );

  public readonly setYear = this.updater((state, year: number) => {
    return {
      ...state,
      year,
    };
  });

  public readonly setMonth = this.updater((state, month: number) => {
    return {
      ...state,
      month,
    };
  });

  public readonly setMonthAndYear = this.updater(
    (state, monthAndYear: { month: number; year: number }) => {
      return {
        ...state,
        ...monthAndYear,
      };
    }
  );

  private readonly _setHover = this.updater((state, hover: DatepickerData) => {
    return {
      ...state,
      hover,
    };
  });

  public readonly setHover = this.effect((event$: Observable<number>) => {
    return event$.pipe(
      filter((day) => day !== undefined),
      withLatestFrom(this.year$, this.month$, this.begin$, this.end$),
      filter(([_, __, ___, begin, end]) => !!begin && !end),
      tap(([day, year, month]) => {
        this._setHover({ day, month, year });
      })
    );
  });

  public readonly resetHover = this.updater((state) => {
    return {
      ...state,
      hover: undefined,
    };
  });

  private readonly _setBegin = this.updater((state, begin: DatepickerData) => {
    return {
      ...state,
      begin,
      end: undefined,
      hover: undefined,
    };
  });

  private readonly _setEnd = this.updater((state, end: DatepickerData) => {
    const begin = state.begin;
    return {
      ...state,
      end,
      value:
        begin && end
          ? {
            begin: new Date(begin.year, begin.month - 1, begin.day),
            end: new Date(end.year, end.month - 1, end.day),
          }
          : undefined,
      hover: undefined,
    };
  });

  public readonly _setSelected = this.updater(
    (state, selected: DatepickerData) => {
      return {
        ...state,
        selected,
        value: new Date(selected.year, selected.month - 1, selected.day),
      };
    }
  );

  public readonly setBeginOrEnd = this.effect((event$: Observable<number>) => {
    return event$.pipe(
      filter((day) => day !== undefined),
      withLatestFrom(
        this.month$,
        this.year$,
        this.begin$,
        this.end$,
        this.mode$
      ),
      tap(([day, month, year, begin, end, mode]) => {
        if (mode === DatepickerMode.SINGLE) {
          this._setSelected({ day, month, year });
          return;
        }

        if (
          !begin ||
          year < begin.year ||
          (year === begin.year && month < begin.month) ||
          (year === begin.year && month === begin.month && day <= begin.day) ||
          (!!begin && !!end)
        ) {
          this._setBegin({ year, month, day });
          return;
        }

        this._setEnd({ year, month, day });
      })
    );
  });

  public readonly setValue = this.updater(
    (state, value: Date | RangepickerValue) => {

      if (value instanceof Date) {
        return {
          ...state,
          value,
          year: value.getFullYear(),
          month: value.getMonth(),
          selected: {
            day: value.getDate(),
            month: value.getMonth() + 1,
            year: value.getFullYear(),
          },
        };
      }

      const { begin, end } = value;

      return {
        ...state,
        value,
        begin: begin
          ? {
            year: begin.getFullYear(),
            month: begin.getMonth() + 1,
            day: begin.getDate(),
          }
          : undefined,
        end: end
          ? {
            year: end.getFullYear(),
            month: end.getMonth() + 1,
            day: end.getDate(),
          }
          : undefined,
        year: begin ? begin.getFullYear() : state.year,
        month: begin ? begin.getMonth() + 1 : state.month,
      };
    }
  );
}
