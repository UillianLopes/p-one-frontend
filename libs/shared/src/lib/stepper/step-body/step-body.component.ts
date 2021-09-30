import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepComponent } from '../step/step.component';
import { StepperComponent } from '../stepper.component';
import { stepBodyAnimation } from './step-body.animations';

export enum EStepBodyState {
  SELECTED_FROM_LEFT = 'selected-from-left',
  SELECTED_FROM_RIGHT = 'selected-from-right',

  UNSELECTED_FROM_LEFT = 'unselected-from-left',
  UNSELECTED_FROM_RIGHT = 'unselected-from-right',

  UNSELECTED = 'unselected',
  SELECTED = 'selected',
}

@Component({
  selector: 'p-one-step-body',
  templateUrl: './step-body.component.html',
  styleUrls: ['./step-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [stepBodyAnimation],
})
export class StepBodyComponent implements OnInit {
  @Input()
  step!: StepComponent;

  @Input()
  stepIndex!: number;

  state$?: Observable<EStepBodyState>;

  constructor(private readonly _stepper: StepperComponent) {}

  ngOnInit(): void {
    this.state$ = this._stepper.selectedStep$.pipe(
      map(({ previousSelectedStepIndex, selectedStepIndex }) => {
        if (this.stepIndex != selectedStepIndex) {
          if (previousSelectedStepIndex == this.stepIndex) {
            return selectedStepIndex > this.stepIndex
              ? EStepBodyState.UNSELECTED_FROM_RIGHT
              : EStepBodyState.UNSELECTED_FROM_LEFT;
          }

          return EStepBodyState.UNSELECTED;
        }

        if (
          previousSelectedStepIndex == undefined ||
          previousSelectedStepIndex == null
        ) {
          return EStepBodyState.SELECTED;
        }

        return previousSelectedStepIndex > selectedStepIndex
          ? EStepBodyState.SELECTED_FROM_LEFT
          : EStepBodyState.SELECTED_FROM_RIGHT;
      })
    );
  }
}
