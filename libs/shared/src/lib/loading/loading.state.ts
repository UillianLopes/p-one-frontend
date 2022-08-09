import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface LoadingState {
  size: 'small' | 'normal';
}

@Injectable()
export class LoadingStore extends ComponentStore<LoadingState> {
  private readonly size$ = this.select(({ size }) => size);
  public readonly isSmall$ = this.select(
    this.size$,
    (size) => size === 'small'
  );

  constructor() {
    super({
      size: 'normal',
    });
  }

  public readonly setSize = this.updater((state, size: 'small' | 'normal') => ({
    ...state,
    size,
  }));
}
