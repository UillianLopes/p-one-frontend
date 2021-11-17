import { Directive, HostListener } from '@angular/core';

import { StepComponent } from './step/step.component';

@Directive({
  selector: '[pOneStepperPrevious]',
})
export class StepperPreviousDirective {
  constructor(
    private readonly _step: StepComponent
  ) {}

  @HostListener('click')
  click(): void {
    this._step.previous();
  }
}
