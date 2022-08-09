import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneFormComponent),
      multi: true,
    },
  ],
})
export class PhoneFormComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  destroyed$ = new Subject<void>();
  phoneFormGroups$ = new Observable<UntypedFormGroup[]>();
  phoneFormGroupsNeedsToChange$ = new Subject<void>();
  phoneFormGroupsValuesChanged$ = new Subject<void>();

  phoneFormArray = this._formBuilder.array([this._buildPhoneForm()]);

  private _value?: string[];
  set value(v: string[] | undefined) {
    const oldValue = this._value;

    this._value = v;

    if (this.onChange && oldValue != this._value) {
      this.onChange(this._value);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }

  get value() {
    return this._value;
  }

  constructor(private readonly _formBuilder: UntypedFormBuilder) {}

  onChange?: (value: any) => void;
  onTouched?: () => void;

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.phoneFormGroups$ = this.phoneFormGroupsNeedsToChange$.pipe(
      startWith(''),
      map(() => {
        return this.phoneFormArray.controls.map(
          (control) => control as UntypedFormGroup
        );
      })
    );

    this.phoneFormArray.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        map((values) => values?.map((value: any) => value?.number))
      )
      .subscribe((values) => {
        if (this.phoneFormArray.invalid) {
          this.value = undefined;
          return;
        }

        this.value = values;
      });
  }

  writeValue(obj: string[]): void {
    if (obj instanceof Array) {
      this.phoneFormArray.clear({
        emitEvent: false,
      });
      for (const phoneForm of obj.map((number) =>
        this._buildPhoneForm(number)
      )) {
        this.phoneFormArray.push(phoneForm, {
          emitEvent: false,
        });
      }
    }

    this.phoneFormGroupsNeedsToChange$.next();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  removePhoneForm(index: number): void {
    this.phoneFormArray.removeAt(index);

    if (this.phoneFormArray.length == 0) {
      this.phoneFormArray.push(this._buildPhoneForm());
    }

    this.phoneFormGroupsNeedsToChange$.next();
  }

  addPhoneForm() {
    this.phoneFormArray.push(this._buildPhoneForm());
    this.phoneFormGroupsNeedsToChange$.next();
  }

  private _buildPhoneForm(number?: string) {
    return this._formBuilder.group({
      number: [number, Validators.required],
    });
  }
}
