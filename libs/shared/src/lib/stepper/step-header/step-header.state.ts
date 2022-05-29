import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface StepHeaderState {
  isValid?: boolean;
  isSelected?: boolean;
}

@Injectable()
export class StepHeaderStore extends ComponentStore<StepHeaderState> {
  public readonly isValid$ = this.select(({ isValid }) => isValid);
  public readonly isSelected$ = this.select(({ isSelected }) => isSelected);

  constructor() {
    super({});
  }

  public readonly setIsValid = this.updater((state, isValid: boolean) => ({
    ...state,
    isValid,
  }));

  public readonly setIsSelected = this.updater(
    (state, isSelected: boolean) => ({
      ...state,
      isSelected,
    })
  );
}
