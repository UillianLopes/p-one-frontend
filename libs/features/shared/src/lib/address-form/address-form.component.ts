import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder } from '@angular/forms';
import { DestroyableMixin } from '@p-one/shared';
import { map, takeUntil } from 'rxjs/operators';

export interface AddressModel {
  number: string;
  street: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

@Component({
  selector: 'p-one-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
  ],
})
export class AddressFormComponent
  extends DestroyableMixin()
  implements ControlValueAccessor, OnInit
{
  public readonly form = this._formBuilder.group({
    number: [''],
    street: [''],
    district: [''],
    country: [''],
    city: [''],
    state: [''],
    zipCode: [''],
  });

  private _onChange?: (value: AddressModel) => void;
  private _onTouched?: () => void;

  @Input()
  public readonly valueChange = new EventEmitter<AddressModel | null>();

  @Input()
  public set value(value: AddressModel | null) {
    this.writeValue(value);
  }

  constructor(private readonly _formBuilder: UntypedFormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        map((value) =>
          value && Object.values(value).some((v) => v && v !== '')
            ? value
            : null
        )
      )
      .subscribe((value) => {
        if (this._onChange) {
          this._onChange(value);
        }

        if (this._onTouched) {
          this._onTouched();
        }
      });
  }

  public writeValue(obj: AddressModel | null): void {
    this.form.patchValue(obj ?? {}, { emitEvent: false });
  }

  public registerOnChange(fn: (value: AddressModel | null) => void): void {
    this._onChange = (value) => {
      fn(value);
      this.valueChange.next(value);
    };
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
