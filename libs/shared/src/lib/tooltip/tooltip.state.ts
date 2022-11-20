import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { TooltipPosition } from './tooltip.directive';

export type TooltipStatus = 'OPENED' | 'CLOSED';
export interface TooltipState {
  status: TooltipStatus;
  position?: TooltipPosition;
}

@Injectable()
export class TooltipStore extends ComponentStore<TooltipState> {
  readonly status$ = this.select(({ status }) => status);
  readonly position$ = this.select(({ position }) => position);

  constructor() {
    super({
      status: 'CLOSED',
    });
  }

  readonly setStatus = this.updater((state, status: TooltipStatus) => ({
    ...state,
    status,
  }));

  readonly setPosition = this.updater((state, position: TooltipPosition) => ({
    ...state,
    position,
  }));
}
