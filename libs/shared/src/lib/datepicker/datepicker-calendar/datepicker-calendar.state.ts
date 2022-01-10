import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, tap, withLatestFrom } from 'rxjs/operators';

export interface DatePickerCalendarData {
  year: number;
  month: number;
  day: number;
}

export interface DatepickerCalendarState {
  today: Date;
  year: number;
  month: number;
  day: number;
}

@Injectable()
export class DatepickerCalendarStore extends ComponentStore<DatepickerCalendarState> {
  public readonly today$ = this.select(({ today }) => today);
  public readonly year$ = this.select(({ year }) => year);
  public readonly day$ = this.select(({ day }) => day);
  public readonly month$ = this.select(({ month }) => month);
  public readonly date$ = this.select(
    this.year$,
    this.month$,
    this.day$,
    (year, month, day) => new Date(year ?? 1, month ?? 0, day ?? 1)
  );

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

      return weeks.filter((w) => !!w.length).map((e) => e);
    }
  );

  constructor() {
    super({
      year: 1,
      month: 0,
      day: 1,
      today: new Date(),
    });
  }

  public readonly nextMonth = this.effect((data$) =>
    data$.pipe(
      withLatestFrom(this.month$),
      map(([_, month]) => month),
      tap((month) => this.setMonth(month < 11 ? month + 1 : 0))
    )
  );

  public readonly previousMonth = this.effect((data$) =>
    data$.pipe(
      withLatestFrom(this.month$),
      map(([_, month]) => month),
      tap((month) => this.setMonth(month > 0 ? month - 1 : 11))
    )
  );

  public readonly previousYear = this.effect((data$) =>
    data$.pipe(
      withLatestFrom(this.year$, this.today$),
      map(([_, year, today]) => ({ year, today })),
      tap(({ year, today }) =>
        this.setYear(year > 1 ? year - 1 : today.getFullYear())
      )
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

  public readonly setDay = this.updater((state, day: number) => {
    return {
      ...state,
      day,
    };
  });
}
