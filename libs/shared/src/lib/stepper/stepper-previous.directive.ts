import { Directive, HostListener } from '@angular/core';

import { StepComponent } from './step/step.component';
import { StepperComponent } from './stepper.component';

@Directive({
  selector: '[pOneStepperPrevious]',
})
export class StepperPreviousDirective {
  constructor(
    private readonly _stepper: StepperComponent,
    private readonly _step: StepComponent
  ) {}

  @HostListener('click')
  click(): void {
    this._stepper.previous();
  }
}
