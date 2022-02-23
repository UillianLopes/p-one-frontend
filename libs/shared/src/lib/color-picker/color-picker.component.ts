import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';

function createBhaviorSubject<T>(
  observable: Observable<T>,
  unsubscriber: Subject<void>,
  initialValue?: T
): BehaviorSubject<T | undefined> {
  const subject = new BehaviorSubject<T | undefined>(initialValue);

  observable
    .pipe(takeUntil(unsubscriber))
    .subscribe((value) => subject.next(value));

  return subject;
}

@Component({
  selector: 'p-one-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  private readonly _destroyed$ = new Subject<void>();

  public readonly control = new FormControl(undefined, [
    Validators.maxLength(7),
  ]);

  private _onChange!: (value: any) => void;
  private _onTouched!: () => void;

  public readonly color$ = createBhaviorSubject(
    this.control.valueChanges,
    this._destroyed$,
    this.control.value
  );

  constructor() {}

  writeValue(obj: any): void {
    this.control.setValue(obj, { emitEvent: true });
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this._destroyed$), skip(1), distinctUntilChanged())
      .subscribe((value) => {
        if (this._onChange) {
          this._onChange(value);
        }

        if (this._onTouched) {
          this._onTouched();
        }
      });
  }
}
