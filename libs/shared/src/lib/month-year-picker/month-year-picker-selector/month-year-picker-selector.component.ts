import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { Info } from 'luxon';
import { map, skip, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins';
import { MonthYearPickerData, MonthYearPickerMode } from '../@types';
import { MonthYearPickerSelectorStore } from './month-year-picker-selector.store';

@Component({
  selector: 'p-one-month-year-picker-selector',
  templateUrl: './month-year-picker-selector.component.html',
  styleUrls: ['./month-year-picker-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonthYearPickerSelectorStore],
})
export class MonthYearPickerSelectorComponent extends DestroyableMixin() implements OnInit {
  public readonly MonthYearPickerMode = MonthYearPickerMode;
  public readonly currentYear = new Date().getFullYear();
  public readonly months = Info.months('short', { locale: this._locale }).map(
    (month, index) => ({ name: month, value: index + 1 })
  );
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
    map((month) => month?.name)
  );

  @Input()
  public set value(v: MonthYearPickerData) {
    this._store.setValue(v);
  }

  @Output()
  public readonly change$ = new EventEmitter<MonthYearPickerData>();

  constructor(
    private readonly _store: MonthYearPickerSelectorStore,
    @Inject(LOCALE_ID) private readonly _locale: string
  ) {
    super();
  }
  ngOnInit(): void {
    this._store.value$
      .pipe(skip(1), takeUntil(this.destroyed$))
      .subscribe((value) => this.change$.emit(value));
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
    this._store.setMonthAndConfirm(month);
  }

  public setYear(year: number): void {
    this._store.setYear(year);
  }

  public setMode(mode: MonthYearPickerMode) {
    this._store.setMode(mode);
  }
}
