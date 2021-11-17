import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StepperState {
  previousSelectedStep?: number;
  selectedStep: number;
  validate?: boolean;
  isCompleted?: boolean;
  steps: { [index: number]: { isValid: boolean } };
}

@Injectable()
export class StepperStateService {
  private readonly _state$ = new BehaviorSubject<StepperState>({
    selectedStep: 0,
    steps: {},
  });

  public readonly selectedStep$ = this._state$.pipe(
    map((state) => state.selectedStep)
  );

  public readonly previousSelectedStep$ = this._state$.pipe(
    map((state) => state.previousSelectedStep)
  );

  public setIsCompleted(isCompleted: boolean): void {
    this._setState({
      isCompleted,
    });
  }

  public setValidate(validate: boolean): void {
    this._setState({
      validate,
    });
  }

  public next(): void {
    const stepIndex = this._state$.value.selectedStep;

    this._setState({
      selectedStep: stepIndex + 1,
      previousSelectedStep: stepIndex,
    });
  }

  public previous(): void {
    const stepIndex = this._state$.value.selectedStep;

    this._setState({
      selectedStep: stepIndex - 1,
      previousSelectedStep: stepIndex,
    });
  }

  public setSelectedIndex(selectedStep: number) {
    const previousSelectedStep = this._state$.value.selectedStep;
    this._setState({
      selectedStep,
      previousSelectedStep,
    });
  }

  private _setState(state: Partial<StepperState>) {
    this._state$.next({
      ...this._state$.value,
      ...state,
    });
  }
}
