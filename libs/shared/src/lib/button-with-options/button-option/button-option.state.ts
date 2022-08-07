import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { Color } from '../../@types';

export type ButtonOptionColor = Color | 'black';
export interface ButtonOptionState {
  color: ButtonOptionColor;
}

const BUTTON_CLASS = new Map<ButtonOptionColor, string[]>([
  ['black', ['text-dark']],
  ['primary', ['text-primary']],
  ['secondary', ['text-secondary']],
  ['success', ['text-success']],
  ['danger', ['text-danger']],
  ['warning', ['text-warning']],
  ['info', ['text-info']],
  ['light', ['text-light']],
  ['dark', ['text-dark']],
]);

@Injectable()
export class ButtonOptionStore extends ComponentStore<ButtonOptionState> {
  public readonly class$ = this.select(({ color }) => BUTTON_CLASS.get(color));

  constructor() {
    super({
      color: 'black',
    });
  }

  public readonly setColor = this.updater((state, color: ButtonOptionColor) => ({
    ...state,
    color,
  }));
}
