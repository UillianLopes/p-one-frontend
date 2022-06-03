import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { map, mergeAll, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { checkboxCheckmarkAnimation, checkboxMinusAnimation } from './checkbox.animations';

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
  ],
})
export class CheckboxComponent
  extends DestroyableMixin()
  implements OnInit, ControlValueAccessor
{
  public readonly formControl = new UntypedFormControl(false);
  public readonly isIndeterminated$ = new BehaviorSubject<boolean>(false);

  private readonly _notifyValueChanged$ = new Subject<boolean>();
  public readonly animationState$ = combineLatest([
    of(this.formControl.valueChanges, this._notifyValueChanged$).pipe(
      mergeAll()
    ),
    this.isIndeterminated$,
  ]).pipe(
    map(([value, isIndeterminated]) =>
      isIndeterminated ? 'indeterminated' : value ? 'checked' : 'unchecked'
    )
  );

  public readonly isChecked$ = this.animationState$.pipe(
    map((value) => value == 'checked')
  );
  @Output()
  readonly valueChange$ = this.formControl.valueChanges;

  @Input()
  set isIndeterminated(isIndeterminated: boolean | null) {
    this.isIndeterminated$.next(isIndeterminated ?? false);
  }

  onTouched?: () => void;
  onChange?: (value: any) => void;

  constructor() {
    super();
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj, { emitEvent: false });
    this._notifyValueChanged$.next(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggle($event: MouseEvent): void {
    $event.stopPropagation();
    this.isIndeterminated$.next(false);
    const value = this.formControl.value;
    this.formControl.setValue(!value);
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (this.onTouched) {
          this.onTouched();
        }

        if (this.onChange) {
          this.onChange(value);
        }
      });
  }
}
