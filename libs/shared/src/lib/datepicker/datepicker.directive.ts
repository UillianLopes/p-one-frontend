import { Directive, ElementRef, forwardRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { DateTime } from 'luxon';

export interface DatepickerDirectiveState {}

export class DatepickerDirectiveStore extends ComponentStore<DatepickerDirectiveState> {}
@Directive({
  selector: 'input[pOneDatepicker]',
  exportAs: 'pOneDatepicker',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerDirective),
      multi: true,
    },
  ],
  host: {
    type: 'date',
  },
})
export class DatepickerDirective implements OnInit, ControlValueAccessor {
  private _onChange?: (obj: any) => void;
  private _onTouched?: () => void;
  private _value?: Date;

  set value(v: Date | undefined) {
    this._value = v;
    if (this._onChange) {
      this._onChange(v);
    }

    if (this._onTouched) {
      this._onTouched();
    }
  }

  get value() {
    return this._value;
  }

  constructor(private readonly _elementRef: ElementRef<HTMLInputElement>) {}

  writeValue(obj?: Date): void {
    this._value = obj;
    this._applyValueToElement();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  ngOnInit(): void {}

  @HostListener('change', ['$event'])
  change({ target }: Event) {
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const value = target.value;

    if (!value) {
      this.value = undefined;
      return;
    }

    const dateTime = DateTime.fromFormat(value, 'yyyy-MM-dd');

    if (dateTime.isValid) this.value = dateTime.toJSDate();
    else this.value = undefined;
  }
  _applyValueToElement() {
    if (!this._value) {
      return;
    }

    this._elementRef.nativeElement.value = DateTime.fromJSDate(
      this._value
    ).toFormat('yyyy-MM-dd');
  }
}
