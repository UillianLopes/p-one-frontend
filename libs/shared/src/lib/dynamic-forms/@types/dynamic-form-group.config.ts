import { ValidatorFn } from '@angular/forms';

import { DynamicFormStructure } from './dynamic-form-structure.config';

export class DynamicFormGroup extends DynamicFormStructure {
  name?: string;
  validators?: ValidatorFn[];

  constructor(args?: DynamicFormGroup) {
    super();

    if (args) {
      Object.assign(this, args);
    }
  }
}
