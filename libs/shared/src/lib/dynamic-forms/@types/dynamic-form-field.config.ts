import { ValidatorFn } from '@angular/forms';

import { DynamicFormElement } from './dynamic-form-element.config';

export abstract class DynamicFormField extends DynamicFormElement {
  initialValue?: string;
  name!: string;
  label!: string;
  validators?: ValidatorFn[];
  mask?: string;

  constructor(args?: DynamicFormField) {
    super();

    if (args) {
      Object.assign(this, args);
    }

    HTMLInputElement;
  }
}

export class DyanamicTextFormField extends DynamicFormField {
  mask?: string;
  type?: 'text' | 'number' | 'password' | 'tel';

  constructor(args?: DyanamicTextFormField) {
    super();

    if (args) {
      Object.assign(this, args);
    }
  }
}
