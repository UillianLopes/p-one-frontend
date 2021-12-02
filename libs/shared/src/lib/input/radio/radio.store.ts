import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { RadioAppearance, RadioColor } from './radio.types';

export interface RadioState {
  value?: any;
  color?: RadioColor;
  appearance?: RadioAppearance;
}

@Injectable()
export class RadioStore extends ComponentStore<RadioState> {
  public readonly value$ = this.select((s) => s.value);
  public readonly color$ = this.select((s) => s.color);
  public readonly appearance$ = this.select((s) => s.appearance);

  constructor() {
    super({});
  }

  setValue(value: any) {
    this.setState((currentState) => {
      return {
        ...currentState,
        value,
      };
    });
  }

  setColor(color: RadioColor) {
    this.setState((currentState) => {
      return {
        ...currentState,
        color,
      };
    });
  }

  setAppearance(appearance: RadioAppearance) {
    this.setState((currentState) => {
      return {
        ...currentState,
        appearance,
      };
    });
  }
}
