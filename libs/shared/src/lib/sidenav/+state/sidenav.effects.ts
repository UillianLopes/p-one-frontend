import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';

import { ESidenavState } from '../sidenav-state.enum';
import { close, ESidenavActions, open, SidenavActionsUnion } from './sidenav.actions';
import { SidenavFacade } from './sidenav.facade';

@Injectable()
export class SidenavEffects {
  public readonly toggle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESidenavActions.TOGGLE),
      withLatestFrom(this._sidenavFacade.state$),
      map(([__, state]) => {
        return state == ESidenavState.CLOSED ? open() : close();
      })
    )
  );

  constructor(
    private readonly _actions$: Actions<SidenavActionsUnion>,
    private readonly _sidenavFacade: SidenavFacade
  ) {}
}
