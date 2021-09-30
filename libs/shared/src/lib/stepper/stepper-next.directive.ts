import { Directive, HostListener } from '@angular/core';

import { StepperComponent } from './stepper.component';

@Directive({
  selector: '[pOneStepperNext]',
})
export class StepperNextDirective {
  constructor(private readonly _stepper: StepperComponent) {}

  @HostListener('click')
  click(): void {
    this._stepper.next();
  }
}
