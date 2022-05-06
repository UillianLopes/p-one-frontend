import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { RadioAppearance, RadioColor, RadioSize } from './radio.types';

export interface RadioState {
  value?: any;
  color?: RadioColor;
  appearance?: RadioAppearance;
  size: RadioSize;
}

@Injectable()
export class RadioStore extends ComponentStore<RadioState> {
  public readonly value$ = this.select((s) => s.value);
  public readonly color$ = this.select((s) => s.color);
  public readonly size$ = this.select((s) => s.size);
  public readonly appearance$ = this.select((s) => s.appearance);

  constructor() {
    super({
      size: 'sm',
    });
  }

  public setValue = this.updater((state, value: any) => ({ ...state, value }));

  public setAppearance = this.updater((state, appearance: RadioAppearance) => ({
    ...state,
    appearance,
  }));

  public setColor = this.updater((state, color: RadioColor) => ({
    ...state,
    color,
  }));

  public setSize = this.updater((state, size: RadioSize) => ({
    ...state,
    size,
  }));
}
