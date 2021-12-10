import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { TooltipRef } from '../../tooltip';
import { MonthYearPickerData, MonthYearPickerMode } from '../@types';
import { MonthYearPickerSelectorStore } from './month-year-picker-selector.store';

const MONTHS = [
  { reference: '0001-01-01', value: 1 },
  { reference: '0001-02-01', value: 2 },
  { reference: '0001-03-01', value: 3 },
  { reference: '0001-04-01', value: 4 },
  { reference: '0001-05-01', value: 5 },
  { reference: '0001-06-01', value: 6 },
  { reference: '0001-07-01', value: 7 },
  { reference: '0001-08-01', value: 8 },
  { reference: '0001-09-01', value: 9 },
  { reference: '0001-10-01', value: 10 },
  { reference: '0001-11-01', value: 11 },
  { reference: '0001-12-01', value: 12 },
];
@Component({
  selector: 'p-one-month-year-picker-selector',
  templateUrl: './month-year-picker-selector.component.html',
  styleUrls: ['./month-year-picker-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonthYearPickerSelectorStore],
})
export class MonthYearPickerSelectorComponent {
  public readonly MonthYearPickerMode = MonthYearPickerMode;
  public readonly currentYear = new Date().getFullYear();
  public readonly months = [...MONTHS];
  public readonly years = [
    ...Array.from(Array(10).keys())
      .map((_, i) => this.currentYear - (i + 1))
      .sort((a, b) => a - b),
    this.currentYear,
    ...Array.from(Array(10).keys()).map((_, i) => this.currentYear + (i + 1)),
  ];
  public readonly value$ = this._store.value$;
  public readonly year$ = this._store.year$;
  public readonly month$ = this._store.month$;
  public readonly mode$ = this._store.mode$;
  public readonly monthToDisplay$ = this.month$.pipe(
    map((month) => this.months.find((m) => m.value === month)),
    map((month) => month?.reference)
  );

  @Input()
  public set value(v: MonthYearPickerData) {
    this._store.setValue(v);
  }

  @Output()
  public readonly change$ = new EventEmitter<MonthYearPickerData>();

  constructor(
    @Optional() public tooltipRef: TooltipRef,
    private readonly _store: MonthYearPickerSelectorStore
  ) {}

  public confirm() {
    this.value$.pipe(take(1)).subscribe((value) => {
      this.change$.next(value);
    });
  }

  public nextYear(): void {
    this._store.nextYear();
  }

  public previousYear(): void {
    this._store.previousYear();
  }

  public nextMonth(): void {
    this._store.nextMonth();
  }

  public previousMonth(): void {
    this._store.previousMonth();
  }

  public setMonth(month: number): void {
    this._store.setMonth(month);
  }

  public setYear(year: number): void {
    this._store.setYear(year);
  }

  public setMode(mode: MonthYearPickerMode) {
    this._store.setMode(mode);
  }
}
