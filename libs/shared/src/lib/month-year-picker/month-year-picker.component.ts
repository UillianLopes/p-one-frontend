import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';
import { MonthYearPickerData, MonthYearPickerStore } from './month-year-picker.store';

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
  public readonly value$ = this._store.value$;
  public readonly year$ = this._store.year$;
  public readonly month$ = this._store.month$;

  @Input()
  set value(value: MonthYearPickerData) {
    this._store.setValue(value);
  }

  @Output()
  public readonly change$ = new EventEmitter<MonthYearPickerData>();

  private _onChanged?: (value: any) => void;
  private _onTouched?: () => void;

  constructor(private readonly _store: MonthYearPickerStore) {
    super();
  }

  ngOnInit(): void {
    if (this.value) {
      this._store.setValue(this.value);
    }

    this.value$
      .pipe(takeUntil(this.destroyed$), skip(1), distinctUntilChanged())
      .subscribe((value) => {
        if (this._onChanged) {
          this._onChanged(value);
        }

        if (this._onTouched) {
          this._onTouched();
        }
      });
  }

  next(): void {
    this._store.next((data) => {
      this.change$.emit(data);
    });
  }

  previous(): void {
    this._store.previous((data) => {
      this.change$.emit(data);
    });
  }

  writeValue(obj: MonthYearPickerData): void {
    this._store.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
