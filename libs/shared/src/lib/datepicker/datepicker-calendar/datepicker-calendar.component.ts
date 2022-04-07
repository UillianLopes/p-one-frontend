import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { DatepickerCalendarStore } from './datepicker-calendar.state';

@Component({
  selector: 'p-one-datepicker-calendar',
  templateUrl: './datepicker-calendar.component.html',
  styleUrls: ['./datepicker-calendar.component.scss'],
  providers: [DatepickerCalendarStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerCalendarComponent implements OnInit {
  public readonly weeks$ = this._store.weeks$;
  public readonly month$ = this._store.month$;
  public readonly year$ = this._store.year$;
  public readonly hover$ = this._store.hover$;
  public readonly begin$ = this._store.begin$;
  public readonly end$ = this._store.end$;

  constructor(private readonly _store: DatepickerCalendarStore) {}

  ngOnInit(): void {}

  setDay(day: number) {
    this._store.setBeginOrEnd(day);
  }

  setHover(day: number): void {
    this._store.setHover(day);
  }

  resetHoverDay(): void {
    this._store.resetHover();
  }
  next() {
    this._store.nextMonth();
  }

  previous() {
    this._store.previousMonth();
  }
}
