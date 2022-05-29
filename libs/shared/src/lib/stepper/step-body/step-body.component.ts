import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins';
import { StepComponent } from '../step/step.component';
import { StepperStore } from '../stepper.state';
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
export class StepBodyComponent extends DestroyableMixin() implements OnInit {
  @Input()
  public step!: StepComponent;

  @Input()
  public stepIndex!: number;

  public readonly state$ = this._stepper.selectedStep$.pipe(
    withLatestFrom(this._stepper.previousSelectedStep$),
    map(([selectedStepIndex, previousSelectedStepIndex]) => {
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

  @Output()
  public readonly status$ = new EventEmitter<FormControlStatus>();

  constructor(private readonly _stepper: StepperStore) {
    super();
  }

  public ngOnInit(): void {
    this.step.status$
      .pipe(
        takeUntil(this.destroyed$),
        tap((result) => console.log('RESULT -> ', result))
      )
      .subscribe((status) => this.status$.next(status));
  }
}
