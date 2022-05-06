import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, skip, startWith, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioStore } from './radio.store';
import { RadioAppearance, RadioColor, RadioSize } from './radio.types';

const NORMAL_COLORS: { [color: string]: string[] } = {
  primary: ['btn-primary'],
  success: ['btn-success'],
  danger: ['btn-danger'],
  warning: ['btn-warning'],
  secondary: ['btn-secondary'],
  light: ['btn-light'],
};

const OUTLINE_COLORS: { [color: string]: string[] } = {
  primary: ['btn-outline-primary'],
  success: ['btn-outline-success'],
  danger: ['btn-outline-danger'],
  warning: ['btn-outline-warning'],
  secondary: ['btn-outline-secondary'],
  light: ['btn-outline-light'],
};

const SIZES: { [size: string]: string } = {
  sm: 'btn-sm',
  lg: 'btn-lg',
  md: 'btn-md',
};

function getCorrectClass(
  color?: RadioColor,
  apperance?: RadioAppearance,
  size?: string
): string[] {
  let classes: string[] = [];

  switch (apperance) {
    case 'outline':
      classes = [...classes, ...OUTLINE_COLORS[color ?? 'primary']];
      break;
    default:
      classes = [...classes, ...NORMAL_COLORS[color ?? 'primary']];
      break;
  }

  return [...classes, SIZES[size ?? 'sm']];
}

@Component({
  selector: 'p-one-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RadioStore,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent
  extends DestroyableMixin()
  implements AfterContentInit, ControlValueAccessor, OnInit
{
  public readonly value$ = this._store.value$;
  public readonly color$ = this._store.color$;
  public readonly buttonClass$ = combineLatest([
    this._store.color$,
    this._store.appearance$,
    this._store.size$,
  ]).pipe(
    map(([color, appearance, size]) => {
      return getCorrectClass(color, appearance, size);
    })
  );

  @Output()
  public readonly change$ = new EventEmitter<any>();

  @Input()
  set value(v: any) {
    this._store.setValue(v);
  }

  @Input()
  set size(v: RadioSize) {
    this._store.setSize(v);
  }

  @Input()
  set color(c: RadioColor) {
    this._store.setColor(c);
  }

  @Input()
  set appearance(c: RadioAppearance) {
    this._store.setAppearance(c);
  }

  @ContentChildren(RadioButtonComponent)
  public buttons?: QueryList<RadioButtonComponent>;
  public buttons$!: Observable<RadioButtonComponent[]>;

  private _onChange?: (v?: any) => void;
  private _onTouched?: () => void;

  constructor(private readonly _store: RadioStore) {
    super();
  }

  ngOnInit(): void {
    this.value$
      .pipe(takeUntil(this.destroyed$), skip(1), distinctUntilChanged())
      .subscribe((value) => {
        if (this._onChange) {
          this._onChange(value);
        }

        if (this._onTouched) {
          this._onTouched();
        }
      });
  }

  public writeValue(obj: any): void {
    this._store.setValue(obj);
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public ngAfterContentInit(): void {
    if (!this.buttons) {
      return;
    }

    this.buttons$ = this.buttons.changes.pipe(
      startWith(this.buttons.map((e) => e)),
      map((e: RadioButtonComponent[]) => e)
    );
  }

  public setValue(value: any) {
    this._store.setValue(value);
    this.change$.emit(value);
  }
}
