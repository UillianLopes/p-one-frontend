import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { Info } from 'luxon';
import { distinctUntilChanged, map, skip, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';
import { TooltipRef } from '../tooltip';
import { MonthYearPickerData } from './@types';
import { MonthYearPickerStore } from './month-year-picker.store';

@Component({
  selector: 'p-one-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MonthYearPickerStore,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthYearPickerComponent),
      multi: true,
    },
  ],
})
export class MonthYearPickerComponent
  extends DestroyableMixin()
  implements ControlValueAccessor, OnInit
{
  public readonly now = new Date();
  public readonly currentYear = this.now.getFullYear();

  public readonly value$ = this._store.value$;
  public readonly year$ = this._store.year$;
  public readonly month$ = this._store.month$;
  public readonly notifiedValue$ = this._store.notifiedValue$;

  public readonly months = Info.months('short', { locale: this._locale });
  public readonly monthToDisplay$ = this.month$.pipe(
    map((month) => month - 1),
    map((month) => this.months[month])
  );

  @Input()
  set value(value: MonthYearPickerData) {
    this._store.setValue(value);
  }

  @Output()
  public readonly change$ = new EventEmitter<MonthYearPickerData>();

  private _onChanged?: (value: any) => void;
  private _onTouched?: () => void;

  constructor(
    private readonly _store: MonthYearPickerStore,
    @Inject(LOCALE_ID) private readonly _locale: string
  ) {
    super();
  }

  public ngOnInit(): void {
    if (this.value) {
      this._store.setValue(this.value);
    }

    this.notifiedValue$
      .pipe(
        skip(1),
        takeUntil(this.destroyed$),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
      .subscribe((value) => {
        if (this._onChanged) {
          this._onChanged(value);
        }

        if (this._onTouched) {
          this._onTouched();
        }

        this.change$.emit(value);
      });
  }

  public setValue(value: MonthYearPickerData, tooltipRef: TooltipRef) {
    this._store.setNotifiedValue(value);
    tooltipRef.close();
  }

  public next(): void {
    this._store.next();
  }

  public previous(): void {
    this._store.previous();
  }

  public writeValue(obj: MonthYearPickerData): void {
    this._store.setValue(obj);
  }

  public registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
