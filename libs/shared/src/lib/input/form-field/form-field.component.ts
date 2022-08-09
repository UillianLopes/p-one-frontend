import { Component, Input } from '@angular/core';

import { FormFieldStore } from './form-field.state';

@Component({
  selector: 'p-one-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [FormFieldStore],
})
export class FormFieldComponent {
  public readonly isLoading$ = this._formFieldStore.isLoading$;
  public readonly noPadding$ = this._formFieldStore.noPadding$;

  @Input()
  public set noPadding(noPadding: boolean | string | undefined) {
    if (typeof noPadding === 'string' || noPadding === undefined) {
      this._formFieldStore.setNoPadding(true);
    } else {
      this._formFieldStore.setNoPadding(noPadding);
    }
  }

  @Input()
  public set isLoading(isLoading: boolean) {
    this._formFieldStore.setIsLoading(isLoading);
  }

  constructor(private readonly _formFieldStore: FormFieldStore) {}
}
