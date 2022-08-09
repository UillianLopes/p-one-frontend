import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export type TooltipStatus = 'OPENED' | 'CLOSED';
export interface TooltipState {
  status: TooltipStatus;
}

@Injectable()
export class TooltipStore extends ComponentStore<TooltipState> {
  public readonly status$ = this.select(({ status }) => status);

  constructor() {
    super({ status: 'CLOSED' });
  }

  public readonly setStatus = this.updater((state, status: TooltipStatus) => ({
    ...state,
    status,
  }));
}
