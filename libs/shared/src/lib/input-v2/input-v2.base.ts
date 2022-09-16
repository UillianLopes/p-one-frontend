import { Directive, HostBinding, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { DestroyableMixin } from '../@mixins';

@Directive()
export abstract class InputV2Base
  extends DestroyableMixin()
  implements ControlValueAccessor, OnInit
{
  protected readonly value$ = new BehaviorSubject<any>(null);
  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  protected set value(value: any) {
    this.value$.next(value);

    if (this.onChange) {
      this.onChange(value);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }

  protected get value(): any {
    return this.value$.getValue();
  }

  constructor() {
    super();
  }

  @HostBinding('disabled')
  disabled = false;

  @HostBinding('readonly')
  readonly = false;

  ngOnInit(): void {}

  writeValue(obj: any): void {
    this.value$.next(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
