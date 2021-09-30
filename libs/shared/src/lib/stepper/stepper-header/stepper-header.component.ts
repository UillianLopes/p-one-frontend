import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SelectedStepIndexChangedEvent } from '../@types/selected-step-index-changed.event';
import { StepperComponent } from '../stepper.component';

@Component({
  selector: 'p-one-stepper-header',
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperHeaderComponent {
  selectedStep$!: Observable<SelectedStepIndexChangedEvent>;

  constructor(private readonly _stepper: StepperComponent) {
    this.selectedStep$ = this._stepper.selectedStep$.pipe();
  }

  goTo(step: number): void {
    this._stepper.goTo(step);
  }
}
