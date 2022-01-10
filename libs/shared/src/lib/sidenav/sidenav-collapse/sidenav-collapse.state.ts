import { Location } from '@angular/common';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';

import { ESidenavState } from '../sidenav-state.enum';
import { SidenavStore } from '../sidenav.state';

export interface SidenavCollapseState {
  state: ESidenavState;
  link?: string;
}

@Injectable()
export class SidenavCollapseStore extends ComponentStore<SidenavCollapseState> {
  public readonly level$: Observable<number> = this._parentStore
    ? this._parentStore.level$.pipe(map((level) => level + 1))
    : of(0);

  public readonly collapseState$ = this.select(({ state }) => state);
  public readonly link$ = this.select(({ link }) => link);
  public readonly isLinkActivated$ = this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith({}),
    withLatestFrom(this.link$),
    map(([_, link]) => {
      return link && this._location.path().startsWith(link);
    })
  );

  public readonly isLinkActivatedAndCollapseClosed$ = this.select(
    this.isLinkActivated$,
    this.collapseState$,
    (isLinkActivated, state) => isLinkActivated && state == ESidenavState.CLOSED
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

  public readonly navigate = this.effect((data$) => {
    return data$.pipe(
      withLatestFrom(this.link$),
      tap(([_, link]) => this._router.navigate([link]))
    );
  });

  public readonly toggle = this.effect((data$) => {
    return data$.pipe(
      withLatestFrom(this.collapseState$, this.isLinkActivated$),
      tap(([_, state, isLinkActivated]) => {
        if (!isLinkActivated) this.navigate();
        switch (state) {
          case ESidenavState.CLOSED:
            this.open();
            break;
          case ESidenavState.OPENED:
            if (isLinkActivated) {
              this.close();
            }
            break;
        }
      })
    );
  });

  public readonly setLink = this.updater((state, link: string) => {
    return {
      ...state,
      link,
    };
  });

  constructor(
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _sidenavStore: SidenavStore,
    @Optional() @SkipSelf() private readonly _parentStore: SidenavCollapseStore
  ) {
    super({
      state: ESidenavState.CLOSED,
    });
  }
}
