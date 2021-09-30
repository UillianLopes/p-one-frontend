import { Directive } from '@angular/core';

@Directive({
  selector: '[pOneLabel]',
  host: {
    class: 'form-label',
  },
})
export class LabelDirective {}
