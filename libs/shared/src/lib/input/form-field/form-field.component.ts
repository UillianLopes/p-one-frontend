import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  host: {
    class: 'p-one-form-field',
  },
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent {}
