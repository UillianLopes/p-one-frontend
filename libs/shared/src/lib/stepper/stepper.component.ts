import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { StepComponent } from './step/step.component';
import { StepperStateService } from './stepper-state.service';

@Component({
  selector: 'p-one-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StepperStateService],
})
export class StepperComponent implements AfterContentInit {
  @Input()
  public set isCompleted(value: boolean) {
    this._stepperStateService.setIsCompleted(value);
  }

  @ContentChildren(StepComponent)
  public steps!: QueryList<StepComponent>;
  public steps$?: Observable<StepComponent[]>;
  public isValid$?: Observable<boolean>;

  constructor(private readonly _stepperStateService: StepperStateService) {}

  ngAfterContentInit(): void {
    this.steps$ = this.steps.changes.pipe(
      startWith(this.steps?.map((step) => step) ?? []),
      map((steps: StepComponent[]) => steps)
    );
  }

  // goTo(stepIndex: number) {
  //   if (this.isCompleted) {
  //     return;
  //   }

  //   if (this.validate) {
  //     const previousStepsFormGroups = this.steps
  //       .filter((_, index) => index < stepIndex)
  //       .map((step) => step.validate());

  //     if (previousStepsFormGroups && previousStepsFormGroups.includes(false)) {
  //       return;
  //     }
  //   }

  //   this.selectedStepIndex = stepIndex;
  // }

  // next(): void {
  //   if (this.isCompleted) {
  //     return;
  //   }

  //   if (this.validate) {
  //     const step = this.steps.get(this.selectedStepIndex);
  //     if (step && !step.validate()) {
  //       return;
  //     }
  //   }

  //   if (this.selectedStepIndex >= this.steps.length - 1) {
  //     return;
  //   }

  //   this.selectedStepIndex++;
  // }

  // previous(): void {
  //   if (this.isCompleted) {
  //     return;
  //   }

  //   if (this.selectedStepIndex <= 0) {
  //     return;
  //   }

  //   this.selectedStepIndex--;
  // }
}
