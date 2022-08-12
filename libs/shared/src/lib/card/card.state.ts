import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { Color } from '../@types/color.type';

export interface CardState {
  isLoading: boolean;
  image?: string;
  color: Color;
}

const COLORS_CLASSES = new Map<Color, string[]>([
  ['primary', ['bg-primary', 'text-white']],
  ['secondary', ['bg-secondary', 'text-white']],
  ['success', ['bg-success', 'text-white']],
  ['danger', ['bg-danger', 'text-white']],
  ['warning', ['bg-warning', 'text-white']],
  ['info', ['bg-info', 'text-white']],
  ['light', ['bg-light', 'text-dark']],
  ['dark', ['bg-dark', 'text-white']],
  ['default', []]
]);

@Injectable()
export class CardStore extends ComponentStore<CardState> {

  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly image$ = this.select(({ image }) => image);
  public readonly color$ = this.select(({ color }) => color);
  public readonly class$ = this.select(({ color }) => COLORS_CLASSES.get(color));

  constructor() {
    super({
      isLoading: false,
      color: 'default',
    });
  }

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  public readonly setImage = this.updater((state, image: string) => ({
    ...state,
    image,
  }));

  public readonly setColor = this.updater((state, color: Color) => ({ ...state, color }));
}
