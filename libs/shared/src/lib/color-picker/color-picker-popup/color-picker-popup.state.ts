import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ColorPickerPopupState {
  color: string;
  initialColor?: string;
}

@Injectable()
export class ColorPickerPopupStore extends ComponentStore<ColorPickerPopupState> {
  public readonly color$ = this.select(({ color }) => color);
  public readonly initialColor$ = this.select(
    ({ initialColor }) => initialColor
  );

  constructor() {
    super({
      color: '#000000',
    });
  }

  public readonly setColor = this.updater((state, color: string) => {
    return {
      ...state,
      color,
    };
  });

  public readonly setInitialColor = this.updater(
    (state, initialColor: string) => {
      return {
        ...state,
        initialColor,
      };
    }
  );
}
