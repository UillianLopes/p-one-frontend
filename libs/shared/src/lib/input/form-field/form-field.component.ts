import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  host: {
    class: 'p-one-form-field',
    '[class.p-one-form-field--no-padding]': 'noPadding',
  },
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent {
  private _noPadding!: boolean;

  @Input()
  set noPadding(v: boolean | string | undefined) {
    this._noPadding = v === undefined || v === '' || v === null || v === true;
  }

  get noPadding(): boolean {
    return this._noPadding;
  }
}
