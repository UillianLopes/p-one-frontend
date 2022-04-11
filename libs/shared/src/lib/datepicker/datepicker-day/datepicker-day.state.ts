import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import * as _ from 'lodash';

import { DatepickerData } from '../datepicker.data';

export interface DatepickerDayState {
  hover?: DatepickerData;
  begin?: DatepickerData;
  end?: DatepickerData;
  selected?: DatepickerData;

  day: number;
  year: number;
  month: number;
}

function isDataBetween(
  compare?: DatepickerData,
  begin?: DatepickerData,
  end?: DatepickerData
) {
  return (
    compare &&
    compare.day !== undefined &&
    begin &&
    end &&
    (compare.year < end.year ||
      (compare.year === end.year && compare.month < end.month) ||
      (compare.year === end.year &&
        compare.month === end.month &&
        compare.day <= end.day)) &&
    (compare.year > begin.year ||
      (compare.year === begin.year && compare.month > begin.month) ||
      (compare.year === begin.year &&
        compare.month === begin.month &&
        compare.day >= begin.day))
  );
}

@Injectable()
export class DatepickerDayStore extends ComponentStore<DatepickerDayState> {
  public readonly begin$ = this.select(({ begin }) => begin);
  public readonly end$ = this.select(({ end }) => end);
  public readonly hover$ = this.select(({ hover }) => hover);
  public readonly selected$ = this.select(({ selected }) => selected);
  public readonly day$ = this.select(({ day }) => day);

  public readonly current$ = this.select(({ day, year, month }) => ({
    day,
    year,
    month,
  }));

  public readonly isBetweenBeginAndHover$ = this.select(
    this.begin$,
    this.hover$,
    this.current$,
    (begin, hover, current) => isDataBetween(current, begin, hover)
  );
  public readonly isBetweenBeginAndEnd$ = this.select(
    this.begin$,
    this.end$,
    this.current$,
    (begin, end, current) => isDataBetween(current, begin, end)
  );

  public readonly isBegin$ = this.select(
    this.begin$,
    this.current$,
    (begin, current) => _.isEqual(begin, current)
  );

  public readonly isEnd$ = this.select(
    this.end$,
    this.current$,
    (end, current) => _.isEqual(end, current)
  );

  public readonly isHover$ = this.select(
    this.hover$,
    this.current$,
    (hover, current) => _.isEqual(hover, current)
  );

  public readonly isSelected$ = this.select(
    this.isBegin$,
    this.isEnd$,
    this.selected$,
    this.current$,
    (isBegin, isEnd, selected, current) =>
      isBegin || isEnd || _.isEqual(selected, current)
  );

  constructor() {
    super({
      year: 1,
      month: 1,
      day: 1,
    });
  }

  public readonly setYear = this.updater((state, year: number) => ({
    ...state,
    year,
  }));

  public readonly setMonth = this.updater((state, month: number) => ({
    ...state,
    month,
  }));

  public readonly setHover = this.updater((state, hover: DatepickerData) => {
    return {
      ...state,
      hover,
    };
  });

  public readonly setBegin = this.updater((state, begin: DatepickerData) => {
    return {
      ...state,
      begin,
    };
  });

  public readonly setEnd = this.updater((state, end: DatepickerData) => {
    return {
      ...state,
      end,
    };
  });

  public readonly setSelected = this.updater(
    (state, selected: DatepickerData) => {
      return {
        ...state,
        selected,
      };
    }
  );

  public readonly setDay = this.updater((state, day: number) => {
    return {
      ...state,
      day,
    };
  });
}
