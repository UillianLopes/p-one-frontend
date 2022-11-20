import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface DialogState {
  isLoading: boolean;
}

@Injectable()
export class DialogStore extends ComponentStore<DialogState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);

  constructor() {
    super({
      isLoading: false,
    });
  }

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });
}
