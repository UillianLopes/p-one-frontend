import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface FormFieldState {
  isLoading: boolean;
  noPadding: boolean;
}

@Injectable()
export class FormFieldStore extends ComponentStore<FormFieldState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly noPadding$ = this.select(({ noPadding }) => noPadding);

  constructor() {
    super({
      isLoading: false,
      noPadding: false,
    });
  }

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  public readonly setNoPadding = this.updater((state, noPadding: boolean) => ({
    ...state,
    noPadding,
  }));
}
