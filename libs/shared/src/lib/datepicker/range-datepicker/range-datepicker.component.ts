import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime } from 'luxon';
import { skip, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins';
import { RangepickerValue } from '../datepicker.data';
import { RangepickerStore } from './range-datepicker.state';

@Component({
  selector: 'p-one-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss'],
  providers: [
    RangepickerStore,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeDatepickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatepickerComponent
  extends DestroyableMixin()
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  public readonly endDisplayDate$ = this._store.endDisplayValue$;
  public readonly beginDisplayDate$ = this._store.beginDisplayValue$;

  private _onChanged?: (value: any) => void;
  private _onTouched?: () => void;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _store: RangepickerStore
  ) {
    super();
    this._store.setElement(this._elementRef.nativeElement);
  }
  ngAfterViewInit(): void {
    this._store.value$
      .pipe(takeUntil(this.destroyed$), skip(1))
      .subscribe((value) => {
        if (this._onChanged) {
          this._onChanged(value);
        }
        if (this._onTouched) {
          this._onTouched();
        }
      });
  }

  public writeValue(obj: RangepickerValue): void {
    if (!obj) {
      return;
    }

    this._store.setValue(obj);
  }

  public registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public ngOnInit(): void {}

  public setBegin(value: string) {
    const begin = DateTime.fromFormat(value, 'yyyy-MM-dd');

    if (!(begin && begin.isValid)) {
      return;
    }

    this._store.setBegin(begin.toJSDate());
  }

  public setEnd(value: string) {
    const end = DateTime.fromFormat(value, 'yyyy-MM-dd');

    if (!(end && end.isValid)) {
      return;
    }

    this._store.setEnd(end.toJSDate());
  }

  public toggle() {
    this._store.toggle();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._store.close();
  }
}
