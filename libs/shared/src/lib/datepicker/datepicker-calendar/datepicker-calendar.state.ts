import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { DatepickerData } from '../datepicker.data';

export interface DatepickerCalendarState {
  today: Date;
  year: number;
  month: number;

  hover?: DatepickerData;
  begin?: DatepickerData;
  end?: DatepickerData;
}

@Injectable()
export class DatepickerCalendarStore extends ComponentStore<DatepickerCalendarState> {
  public readonly today$ = this.select(({ today }) => today);
  public readonly year$ = this.select(({ year }) => year);
  public readonly month$ = this.select(({ month }) => month);

  public readonly begin$ = this.select(({ begin }) => begin);
  public readonly end$ = this.select(({ end }) => end);

  public readonly hover$ = this.select(({ hover }) => hover);

  public readonly weeks$ = this.select(
    this.year$,
    this.month$,
    (year, month) => {
      const weeks: number[][] = [];
      const firstDate = new Date(year, month, 1);
      const lastDate = new Date(year, month + 1, 0);
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

  constructor() {
    super({
      year: 1,
      month: 1,
      today: new Date(),
    });
  }

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

  public readonly _setBegin = this.updater((state, begin: DatepickerData) => {
    return {
      ...state,
      begin,
      hover: undefined,
    };
  });

  public readonly _setEnd = this.updater((state, end: DatepickerData) => {
    return {
      ...state,
      end,
      hover: undefined,
    };
  });

  public readonly _resetEnd = this.updater((state) => {
    return {
      ...state,
      end: undefined,
    };
  });

  public readonly setBeginOrEnd = this.effect((event$: Observable<number>) => {
    return event$.pipe(
      filter((day) => day !== undefined),
      withLatestFrom(this.month$, this.year$, this.begin$, this.end$),
      tap(([day, month, year, begin, end]) => {
        if (
          !begin ||
          year < begin.year ||
          (year === begin.year && month < begin.month) ||
          (year === begin.year && month === begin.month && day <= begin.day) ||
          (!!begin && !!end)
        ) {
          this._setBegin({ year, month, day });
          this._resetEnd();
          return;
        }

        this._setEnd({ year, month, day });
      })
    );
  });
}
