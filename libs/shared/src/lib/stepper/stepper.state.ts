import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

export interface StepperState {
  previousSelectedStep?: number;
  selectedStep: number;
  stepAmmount: number;
  validate?: boolean;
  isCompleted?: boolean;

  steps: {
    [index: number]: FormControlStatus;
  };
}

@Injectable()
export class StepperStore extends ComponentStore<StepperState> {
  public readonly selectedStep$ = this.select(
    ({ selectedStep }) => selectedStep
  );

  public readonly previousSelectedStep$ = this.select(
    ({ previousSelectedStep }) => previousSelectedStep
  );

  public readonly validate$ = this.select(({ validate }) => validate);
  public readonly steps$ = this.select(({ steps }) => steps);
  public readonly stepAmmount$ = this.select(({ stepAmmount }) => stepAmmount);

  constructor() {
    super({
      selectedStep: 0,
      stepAmmount: 0,
      steps: {},
    });
  }

  public readonly setStepAmmount = this.updater(
    (state, stepAmmount: number) => ({ ...state, stepAmmount })
  );

  public readonly setStepStatus = this.updater(
    (
      { steps, ...state },
      { index, status }: { index: number; status: FormControlStatus }
    ) => {
      return {
        ...state,
        steps: {
          ...steps,
          [index]: status,
        },
      };
    }
  );

  public readonly setIsCompleted = this.updater(
    (state, isCompleted: boolean) => ({
      ...state,
      isCompleted,
    })
  );

  public readonly setValidate = this.updater((state, validate: boolean) => ({
    ...state,
    validate,
  }));

  public readonly next = this.effect((event$: Observable<void>) =>
    event$.pipe(
      withLatestFrom(this.steps$, this.selectedStep$, this.stepAmmount$),
      filter(
        ([_, steps, selectedStep, stepAmmount]) =>
          steps &&
          !['INVALID', 'DISABLED'].includes(steps[selectedStep]) &&
          selectedStep < stepAmmount - 1
      ),
      tap({
        next: ([_, __, selectedStep, ___]) =>
          this.patchState({ selectedStep: selectedStep + 1 }),
      })
    )
  );

  public readonly previous = this.effect((event$: Observable<void>) =>
    event$.pipe(
      withLatestFrom(this.selectedStep$),
      filter(([, selectedStep]) => selectedStep > 0),
      tap({
        next: () =>
          this.patchState(({ selectedStep, ...state }) => ({
            ...state,
            selectedStep: selectedStep - 1,
            previousSelectedStep: selectedStep,
          })),
      })
    )
  );

  public readonly setSelectedStep = this.effect((data$: Observable<number>) =>
    data$.pipe(
      withLatestFrom(this.selectedStep$, this.steps$),
      filter(
        ([newSelectedStep, selectedStep, steps]) =>
          newSelectedStep < selectedStep ||
          !['INVALID', 'DISABLED'].includes(steps[selectedStep])
      ),
      tap({
        next: ([selectedStep]) =>
          this.patchState((state) => ({ ...state, selectedStep })),
      })
    )
  );
}
