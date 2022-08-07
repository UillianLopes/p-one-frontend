import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { Color } from '../../@types';

export type SidenavItemColor = Color | 'transparent';
export interface SidenavItemState {
  color: SidenavItemColor;
}

const SIDENAV_COLORS = new Map<SidenavItemColor, string[]>([
  ['transparent', ['transparent']],
  ['primary', ['bg-primary', 'text-white']],
  ['secondary', ['bg-secondary', 'text-white']],
  ['success', ['bg-success', 'text-white']],
  ['danger', ['bg-danger', 'text-white']],
  ['warning', ['bg-warning', 'text-white']],
  ['info', ['bg-info', 'text-white']],
  ['light', ['bg-light', 'text-dark']],
  ['dark', ['bg-dark', 'text-white']],
]);

@Injectable()
export class SidenavItemStore extends ComponentStore<SidenavItemState> {
  public readonly color$ = this.select(({ color }) => color);
  public readonly class$ = this.select(this.color$, (color) =>
    SIDENAV_COLORS.get(color)
  );

  constructor() {
    super({
      color: 'transparent',
    });
  }

  public readonly setColor = this.updater((state, color: SidenavItemColor) => ({
    ...state,
    color,
  }));
}
