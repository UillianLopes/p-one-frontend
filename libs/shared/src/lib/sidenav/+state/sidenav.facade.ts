import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ESidenavMode } from '../sidenav-mode.enum';
import * as SidenavActions from './sidenav.actions';
import { SidenavState } from './sidenav.reducer';
import * as SidenavSelectors from './sidenav.selectors';

@Injectable()
export class SidenavFacade {
  public readonly state$ = this._store.select(SidenavSelectors.selectState);

  public readonly isOpened$ = this._store.select(
    SidenavSelectors.selectIsOpened
  );

  public readonly isClosed$ = this._store.select(
    SidenavSelectors.selectIsClosed
  );

  public readonly isFloating$ = this._store.select(
    SidenavSelectors.selectIsFloating
  );

  public readonly isFixed$ = this._store.select(SidenavSelectors.selectIsFixed);

  public readonly sidenavWidth$ = this._store.select(
    SidenavSelectors.selectSidenavWidth
  );

  public readonly sidenavHeaderHeight$ = this._store.select(
    SidenavSelectors.selectSidenavHeaderHeight
  );
  public readonly mode$ = this._store.select(SidenavSelectors.selectMode);

  constructor(private readonly _store: Store<SidenavState>) {}

  toggle() {
    this._store.dispatch(SidenavActions.toggle());
  }

  open() {
    this._store.dispatch(SidenavActions.open());
  }

  close() {
    this._store.dispatch(SidenavActions.close());
  }

  setMode(mode: ESidenavMode): void {
    this._store.dispatch(SidenavActions.setMode({ mode }));
  }

  setSidenavWidth(sidnavWidth: number) {
    this._store.dispatch(SidenavActions.setSidenavWidth({ sidnavWidth }));
  }

  setSidenavHeaderHeight(sidenavHeaderHeight: number) {
    this._store.dispatch(
      SidenavActions.setSidenavHeaderHeight({ sidenavHeaderHeight })
    );
  }
}
