import { Directive, HostListener } from '@angular/core';

import { StepperComponent } from './stepper.component';

@Directive({
  selector: '[pOneStepperNext]',
})
export class StepperNextDirective {
  constructor(private readonly _stepper: StepperComponent) {}

  @HostListener('click', ['$event'])
  click($event: MouseEvent): void {
    
    this._stepper.next();
  }
}
