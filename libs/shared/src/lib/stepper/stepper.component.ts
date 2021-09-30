import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SelectedStepIndexChangedEvent } from './@types/selected-step-index-changed.event';
import { StepComponent } from './step/step.component';

@Component({
  selector: 'p-one-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input()
  validate?: boolean;

  private _selectedStepIndex = 0;
  set selectedStepIndex(value: number) {
    const previousSelectedStepIndex = this._selectedStepIndex;
    this._selectedStepIndex = value;

    this.selectedStep$.next({
      previousSelectedStepIndex,
      selectedStepIndex: this._selectedStepIndex,
    });
  }

  get selectedStepIndex(): number {
    return this._selectedStepIndex;
  }

  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>;
  get steps$(): Observable<StepComponent[]> {
    return this.steps.changes.pipe(
      startWith(this.steps.map((step) => step)),
      map((steps: StepComponent[]) => steps)
    );
  }
  
  readonly selectedStep$ =
    new BehaviorSubject<SelectedStepIndexChangedEvent>({
      selectedStepIndex: this._selectedStepIndex,
    });

  goTo(stepIndex: number) {
    if (this.validate) {
      const previousStepsFormGroups = this.steps
        .filter((_, index) => index < stepIndex)
        .map((step) => step.validate());

      if (previousStepsFormGroups && previousStepsFormGroups.includes(false)) {
        return;
      }
    }

    this.selectedStepIndex = stepIndex;
  }

  next(): void {
    if (this.validate) {
      const step = this.steps.get(this.selectedStepIndex);
      if (step && !step.validate()) {
        return;
      }
    }

    if (this.selectedStepIndex >= this.steps.length - 1) {
      return;
    }

    this.selectedStepIndex++;
  }

  previous(): void {
    if (this.selectedStepIndex <= 0) {
      return;
    }

    this.selectedStepIndex--;
  }
}
