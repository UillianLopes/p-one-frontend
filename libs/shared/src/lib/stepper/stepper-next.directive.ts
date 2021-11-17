import { Directive, HostListener } from '@angular/core';

import { StepComponent } from './step/step.component';

@Directive({
  selector: '[pOneStepperNext]',
})
export class StepperNextDirective {
  constructor(private readonly _stepComponent: StepComponent) {}

  @HostListener('click')
  click(_: MouseEvent): void {
    this._stepComponent.next();
  }
}
