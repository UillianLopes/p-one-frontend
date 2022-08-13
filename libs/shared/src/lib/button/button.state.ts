import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import * as _ from 'lodash';

import { Color } from '../@types';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonAppearance = 'outline' | 'standard';

export interface ButtonState {
  isLoading: boolean;
  disabled: boolean;
  color: Color;
  size: ButtonSize;
  appearance: ButtonAppearance;
}

const BUTTON_COLORS = new Map<Color, string[]>([
  ['primary', ['btn-primary']],
  ['secondary', ['btn-secondary']],
  ['success', ['btn-success']],
  ['danger', ['btn-danger']],
  ['warning', ['btn-warning']],
  ['info', ['btn-info']],
  ['light', ['btn-light']],
  ['dark', ['btn-dark']],
  ['default', ['btn-primary']],
]);

const OUTLINE_BUTTON_COLORS = new Map<Color, string[]>([
  ['primary', ['btn-outline-primary']],
  ['secondary', ['btn-outline-secondary']],
  ['success', ['btn-outline-success']],
  ['danger', ['btn-outline-danger']],
  ['warning', ['btn-outline-warning']],
  ['info', ['btn-outline-info']],
  ['light', ['btn-outline-light']],
  ['dark', ['btn-outline-dark']],
  ['default', ['btn-outline-primary']],
]);

const BUTTONS_SIZES = new Map<ButtonSize, string[]>([
  ['small', ['btn-sm']],
  ['medium', ['btn-md']],
  ['large', ['btn-lg']],
]);



export const MANAGED_CLASSES = [ 
  ..._.flatMap(Array.from(BUTTON_COLORS.values())), 
  ..._.flatMap(Array.from(OUTLINE_BUTTON_COLORS.values())),
  ..._.flatMap(Array.from(BUTTONS_SIZES.values()))
]

@Injectable()
export class ButtonStore extends ComponentStore<ButtonState> {
  private readonly _disabled$ = this.select(({ disabled }) => disabled);

  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly isDisabled$ = this.select(
    this.isLoading$,
    this._disabled$,
    (isLoading, disabled) => isLoading || disabled
  );

  public readonly classes$ = this.select(({ color, size, appearance }) => {
    let colorClasses = [];

    switch (appearance) {
      case 'outline':
        colorClasses = OUTLINE_BUTTON_COLORS.get(color) ?? [];
        break;

      default:
        colorClasses = BUTTON_COLORS.get(color) ?? [];
        break;
    }

    const sizeClasses = BUTTONS_SIZES.get(size) ?? [];
    return [...colorClasses, ...sizeClasses];
  });

  constructor() {
    super({
      isLoading: false,
      disabled: false,
      color: 'primary',
      size: 'medium',
      appearance: 'standard',
    });
  }

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  public readonly setDisabled = this.updater((state, disabled: boolean) => ({
    ...state,
    disabled,
  }));

  public readonly setColor = this.updater((state, color: Color) => ({
    ...state,
    color,
  }));

  public readonly setAppearance = this.updater(
    (state, appearance: ButtonAppearance) => ({
      ...state,
      appearance,
    })
  );

  public readonly setSize = this.updater((state, size: ButtonSize) => ({
    ...state,
    size,
  }));
}
