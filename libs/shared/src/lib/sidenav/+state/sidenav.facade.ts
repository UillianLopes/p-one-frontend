import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';

import { ESidenavMode } from '../sidenav-mode.enum';
import { ESidenavState } from '../sidenav-state.enum';

export interface SidenavState {
  state: ESidenavState;
  mode: ESidenavMode;
  sidenavWidth: number;
  sidenavHeaderHeight?: number;
}

@Injectable()
export class SidenavFacade {
  private readonly _state$ = new BehaviorSubject<SidenavState>({
    state: ESidenavState.CLOSED,
    mode: ESidenavMode.FIXED,
    sidenavWidth: 50,
  });

  public readonly state$ = this._state$.pipe(map((e) => e.state));

  public readonly isOpened$ = this.state$.pipe(
    map((state) => state === ESidenavState.OPENED)
  );
  public readonly isClosed$ = this.state$.pipe(
    map((state) => state === ESidenavState.OPENED)
  );

  public readonly mode$ = this._state$.pipe(map((e) => e.mode));

  public readonly isFloating$ = this.mode$.pipe(
    map((mode) => mode === ESidenavMode.FLOATING)
  );
  public readonly isFixed$ = this.mode$.pipe(
    map((mode) => mode === ESidenavMode.FIXED)
  );

  public readonly sidenavWidth$ = this._state$.pipe(map((e) => e.sidenavWidth));
  public readonly sidenavHeaderHeight$ = this._state$.pipe(
    map((e) => e.sidenavHeaderHeight)
  );

  private readonly _toggle$ = new Subject();

  constructor() {}

  public registerEffects(destrucionNotifier$: Subject<any>) {
    this._toggle$
      .pipe(takeUntil(destrucionNotifier$), withLatestFrom(this.state$))
      .subscribe(([_, state]) => {
        if (state === ESidenavState.CLOSED) {
          this.open();
          return;
        }
        this.close();
      });
  }

  public toggle() {
    this._toggle$.next();
  }

  public open() {
    this._setState({
      state: ESidenavState.OPENED,
    });
  }

  public close() {
    this._setState({
      state: ESidenavState.CLOSED,
    });
  }

  public setMode(mode: ESidenavMode): void {
    this._setState({
      mode,
    });
  }

  public setSidenavWidth(sidenavWidth: number) {
    this._setState({
      sidenavWidth,
    });
  }

  public setSidenavHeaderHeight(sidenavHeaderHeight: number) {
    this._setState({
      sidenavHeaderHeight,
    });
  }

  private _setState(newState: Partial<SidenavState>) {
    this._state$.next({
      ...this._state$.value,
      ...newState,
    });
  }
}
