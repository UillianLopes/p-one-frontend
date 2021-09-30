import { ControlValueAccessor } from '@angular/forms';
import * as _ from 'lodash';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';

export abstract class BaseForm<T>
  extends DestroyableMixin()
  implements ControlValueAccessor
{
  private _value?: T;
  set value(value: T | undefined) {
    if (_.isEqual(this._value, value)) {
      return;
    }

    this._value = value;

    if (this.onChange) {
      this.onChange(this._value);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }

  get value(): T | undefined {
    return this._value;
  }

  onChange?: (value?: T) => void;
  onTouched?: () => void;

  abstract writeValue(obj: any): void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
