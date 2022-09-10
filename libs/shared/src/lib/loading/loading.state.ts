import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface LoadingState {
  size: 'small' | 'normal';
  withBackground: boolean;
}

@Injectable()
export class LoadingStore extends ComponentStore<LoadingState> {
  private readonly size$ = this.select(({ size }) => size);
  public readonly isSmall$ = this.select(
    this.size$,
    (size) => size === 'small'
  );

  public readonly withBackground$ = this.select(
    ({ withBackground }) => withBackground
  );

  constructor() {
    super({
      size: 'normal',
      withBackground: false,
    });
  }

  public readonly setSize = this.updater((state, size: 'small' | 'normal') => ({
    ...state,
    size,
  }));

  public readonly setWithBackground = this.updater(
    (state, withBackground: boolean) => ({ ...state, withBackground })
  );
}
