import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins/destroyable.mixin';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { MultipleAutocompleteStore } from './multiple-autocomplete.store';

@Component({
  selector: 'p-one-multiple-autocomplete',
  templateUrl: './multiple-autocomplete.component.html',
  styleUrls: ['./multiple-autocomplete.component.scss'],
  providers: [
    MultipleAutocompleteStore,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleAutocompleteComponent),
      multi: true,
    },
  ],
})
export class MultipleAutocompleteComponent
  extends DestroyableMixin()
  implements OnInit, ControlValueAccessor
{
  public readonly value$ = this._store.value$;

  @Input()
  public value?: any[];

  @Output()
  public change$ = new EventEmitter<any[]>();
  public control = new FormControl();

  @Output()
  public search$ = this.control.valueChanges.pipe(
    filter((value) => typeof value === 'string')
  );

  @Input()
  public displayFn: (obj: any) => string = (obj) => obj;

  private _onChange?: (obj: any[]) => void;
  private _onTouched?: () => void;

  @Input('pOneAutocomplete')
  public autocomplete!: AutocompleteComponent;

  constructor(private readonly _store: MultipleAutocompleteStore) {
    super();
  }

  public writeValue(obj: any): void {
    if (obj instanceof Array) {
      this._store.setValue(obj);
    }
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public ngOnInit(): void {
    if (this.value) {
      this._store.addMultiple(this.value);
    }

    if (!this.autocomplete.displayFn) {
      this.autocomplete.displayFn = this.displayFn;
    }

    this.value$.subscribe((value) => {
      if (this._onChange) {
        this._onChange(value);
      }

      if (this._onTouched) {
        this._onTouched();
      }

      this.change$.emit(value);
    });

    if (this.autocomplete) {
      this.autocomplete.change$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((value) => {
          this._store.add(value);
        });
    }
  }

  public addValue(value: any) {
    this._store.add(value);
  }

  public remove(value: any): void {
    this._store.remove(value);
  }
}
