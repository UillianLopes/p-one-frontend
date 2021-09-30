import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StepBodyComponent } from './step-body/step-body.component';
import { StepComponent } from './step/step.component';
import { StepperBodyComponent } from './stepper-body/stepper-body.component';
import { StepperHeaderComponent } from './stepper-header/stepper-header.component';
import { StepperNextDirective } from './stepper-next.directive';
import { StepperPreviousDirective } from './stepper-previous.directive';
import { StepperComponent } from './stepper.component';
import { StepHeaderComponent } from './step-header/step-header.component';

@NgModule({
  declarations: [
    StepperComponent,
    StepComponent,
    StepperHeaderComponent,
    StepperBodyComponent,
    StepBodyComponent,
    StepperNextDirective,
    StepperPreviousDirective,
    StepHeaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    StepperComponent,
    StepComponent,
    StepperPreviousDirective,
    StepperNextDirective,
  ],
})
export class POneStepperModule {}
