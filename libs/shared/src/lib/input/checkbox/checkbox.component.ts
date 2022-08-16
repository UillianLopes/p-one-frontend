import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { checkboxCheckmarkAnimation, checkboxMinusAnimation } from './checkbox.animations';
import { CheckBoxStore } from './checkbox.state';

@Component({
  selector: 'p-one-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [checkboxCheckmarkAnimation, checkboxMinusAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    CheckBoxStore,
  ],
})
export class CheckboxComponent
  extends DestroyableMixin()
  implements OnInit, ControlValueAccessor
{
  public readonly isIndeterminated$ = this._store.isIndeterminated$;
  public readonly isChecked$ = this._store.isChecked$;

  public readonly animationState$ = combineLatest([
    this.isChecked$,
    this.isIndeterminated$,
  ]).pipe(
    map(([isChecked, isIndeterminated]) =>
      isIndeterminated ? 'indeterminated' : isChecked ? 'checked' : 'unchecked'
    )
  );

  @Output()
  readonly valueChange$ = new EventEmitter<boolean>();

  private _value = false;
  private _initialized = false;

  @Input() set value(value: boolean) {
    if (!this._initialized) {
      this.writeValue(value);
    }
  }

  @Input()
  set isIndeterminated(isIndeterminated: boolean) {
    this._store.setIsIndeterminated(isIndeterminated);
  }

  onTouched?: () => void;
  onChange?: (value: any) => void;

  constructor(private readonly _store: CheckBoxStore) {
    super();
  }

  writeValue(obj: boolean): void {
    this._value = obj;
    this._store.setIsChecked(this._value);

    if (!this._initialized) this._initialized = true;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggle(): void {
    this._store.setIsIndeterminated(false);
    this.valueChange$.next(this._value);
    this.writeValue(!this._value);

    if (this.onTouched) {
      this.onTouched();
    }

    if (this.onChange) {
      this.onChange(this._value);
    }
  }

  ngOnInit(): void {}
}
