import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { Info } from 'luxon';

import { DatepickerMode } from '../datepicker-mode.enum';
import { RangepickerValue } from '../datepicker.data';
import { DatepickerCalendarStore } from './datepicker-calendar.state';

@Component({
  selector: 'p-one-datepicker-calendar',
  templateUrl: './datepicker-calendar.component.html',
  styleUrls: ['./datepicker-calendar.component.scss'],
  providers: [DatepickerCalendarStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerCalendarComponent implements OnInit {
  public readonly weekDays = Info.weekdays('short', { locale: this._locale });
  public readonly weeks$ = this._store.weeks$;
  public readonly month$ = this._store.month$;
  public readonly year$ = this._store.year$;
  public readonly hover$ = this._store.hover$;
  public readonly begin$ = this._store.begin$;
  public readonly end$ = this._store.end$;
  public readonly monthAndYear$ = this._store.monthAndYear$;
  public readonly selected$ = this._store.selected$;
  public readonly DatepickerMode = DatepickerMode;

  @Output()
  public readonly value$ = this._store.value$;

  @Input()
  public set mode(v: DatepickerMode) {
    this._store.setMode(v);
  }

  constructor(
    private readonly _store: DatepickerCalendarStore,
    @Inject(LOCALE_ID) private readonly _locale: string
  ) {}

  public ngOnInit(): void {}

  public setDay(day: number) {
    this._store.setBeginOrEnd(day);
  }

  public setHover(day: number): void {
    this._store.setHover(day);
  }

  public resetHoverDay(): void {
    this._store.resetHover();
  }

  public setMonthAndYear(monthAndYear: { month: number; year: number }) {
    this._store.setMonthAndYear(monthAndYear);
  }

  public setValue(value: RangepickerValue | Date): void {
    this._store.setValue(value);
  }
}
