import { Directive } from '@angular/core';

@Directive({
  selector: '[pOneInvalidFeedback]',
  host: {
    class: 'invalid-feedback',
  },
})
export class InvalidFeedbackDirective {}
