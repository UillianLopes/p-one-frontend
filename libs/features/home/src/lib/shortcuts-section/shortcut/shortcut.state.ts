import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Color } from '@p-one/shared';

interface ShortcutState {
  color: Color;
}

const CLASSES = new Map<Color, string[]>([
  ['primary', ['bg-primary', 'text-white']],
  ['secondary', ['bg-secondary', 'text-white']],
  ['success', ['bg-success', 'text-white']],
  ['danger', ['bg-danger', 'text-white']],
  ['warning', ['bg-warning', 'text-white']],
  ['info', ['bg-info', 'text-white']],
  ['light', ['bg-light', 'text-dark']],
  ['dark', ['bg-dark', 'text-white']],
  ['default', []],
]);

@Injectable()
export class ShortcutStore extends ComponentStore<ShortcutState> {
  readonly color$ = this.select(({ color }) => color);
  readonly classes$ = this.select(this.color$, (color) => CLASSES.get(color));

  constructor() {
    super({ color: 'primary' });
  }

  public readonly setColor = this.updater((state, color: Color) => ({
    ...state,
    color,
  }));
}
