import { Directive, forwardRef, HostBinding, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputV2Base } from './input-v2.base';

@Directive({
  selector: '[pOneInputV2]',
  exportAs: 'pOneInputV2',
  host: {
    '[class.form-control]': 'useFormControl',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputV2Directive),
      multi: true,
    },
  ],
})
export class InputV2Directive extends InputV2Base {
  @HostBinding('class.form-control')
  @Input()
  useFormControl = true;

  constructor() {
    super();
  }
}
