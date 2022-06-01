import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'p-one-stepper-header',
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperHeaderComponent {}
