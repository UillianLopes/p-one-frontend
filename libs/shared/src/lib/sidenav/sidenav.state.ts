import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, withLatestFrom } from 'rxjs/operators';

import { ESidenavMode } from './sidenav-mode.enum';
import { ESidenavState } from './sidenav-state.enum';

export interface SidenavState {
  state: ESidenavState;
  mode: ESidenavMode;
  sidenavWidth: number;
  sidenavHeaderHeight?: number;
}

@Injectable()
export class SidenavStore extends ComponentStore<SidenavState> {
  public readonly sidenavState$ = this.select(({ state }) => state);

  public readonly isOpened$ = this.select(
    this.sidenavState$,
    (state) => state == ESidenavState.OPENED
  );

  public readonly isClosed$ = this.select(
    this.sidenavState$,
    (state) => state == ESidenavState.CLOSED
  );

  public readonly mode$ = this.select(({ mode }) => mode);

  public readonly isFixed$ = this.select(
    this.mode$,
    (mode) => mode === ESidenavMode.FIXED
  );

  public readonly isFloating$ = this.select(
    this.mode$,
    (mode) => mode === ESidenavMode.FLOATING
  );

  public readonly sidenavWidth$ = this.select(
    ({ sidenavWidth }) => sidenavWidth
  );

  public readonly sidenavHeaderHeight$ = this.select(
    ({ sidenavHeaderHeight }) => sidenavHeaderHeight
  );

  public readonly open = this.updater((state) => {
    return {
      ...state,
      state: ESidenavState.OPENED,
    };
  });

  public readonly close = this.updater((state) => {
    return {
      ...state,
      state: ESidenavState.CLOSED,
    };
  });

  public readonly toggle = this.effect((data$) => {
    return data$.pipe(
      withLatestFrom(this.sidenavState$),
      tap(([_, state]) => {
        switch (state) {
          case ESidenavState.OPENED:
            this.close();
            break;
          case ESidenavState.CLOSED:
            this.open();
            break;
        }
      })
    );
  });

  public readonly setSidenavWidth = this.updater(
    (state, sidenavWidth: number) => {
      return {
        ...state,
        sidenavWidth,
      };
    }
  );

  public readonly setSidenavHeaderHeight = this.updater(
    (state, sidenavHeaderHeight: number) => {
      return {
        ...state,
        sidenavHeaderHeight,
      };
    }
  );

  public readonly setMode = this.updater((state, mode: ESidenavMode) => {
    return {
      ...state,
      mode,
    };
  });

  constructor() {
    super({
      state: ESidenavState.CLOSED,
      mode: ESidenavMode.FIXED,
      sidenavWidth: 50,
    });
  }
}
