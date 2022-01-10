import { Component, OnInit } from '@angular/core';

import { DatepickerCalendarStore } from './datepicker-calendar.state';

@Component({
  selector: 'p-one-datepicker-calendar',
  templateUrl: './datepicker-calendar.component.html',
  styleUrls: ['./datepicker-calendar.component.scss'],
  providers: [DatepickerCalendarStore],
})
export class DatepickerCalendarComponent implements OnInit {
  public readonly weeks$ = this._store.weeks$;
  public readonly day$ = this._store.day$;
  public readonly month$ = this._store.month$;

  constructor(private readonly _store: DatepickerCalendarStore) {}

  ngOnInit(): void {}
}
