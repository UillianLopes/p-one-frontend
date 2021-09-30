import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'p-one-stepper-body',
  templateUrl: './stepper-body.component.html',
  styleUrls: ['./stepper-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperBodyComponent {}
