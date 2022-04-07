import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { DatepickerData } from '../datepicker.data';
import { DatepickerDayStore } from './datepicker-day.state';

@Component({
  selector: 'p-one-datepicker-day',
  templateUrl: './datepicker-day.component.html',
  styleUrls: ['./datepicker-day.component.scss'],
  providers: [DatepickerDayStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerDayComponent implements OnInit {
  @Input() set begin(v: DatepickerData) {
    this._store.setBegin(v);
  }
  @Input() set end(v: DatepickerData) {
    this._store.setEnd(v);
  }
  @Input() set hover(v: DatepickerData) {
    this._store.setHover(v);
  }

  @Input() set day(v: number) {
    this._store.setDay(v);
  }

  @Input() set year(v: number) {
    this._store.setYear(v);
  }

  @Input() set month(v: number) {
    this._store.setMonth(v);
  }

  public readonly isHover$ = this._store.isHover$;
  public readonly day$ = this._store.day$;
  public readonly isBegin$ = this._store.isBegin$;
  public readonly isEnd$ = this._store.isEnd$;
  public readonly isSelected$ = this._store.isSelected$;
  public readonly isBetweenBeginAndHover$ = this._store.isBetweenBeginAndHover$;
  public readonly isBetweenBeginAndEnd$ = this._store.isBetweenBeginAndEnd$;

  constructor(private readonly _store: DatepickerDayStore) {}

  ngOnInit(): void {}
}
