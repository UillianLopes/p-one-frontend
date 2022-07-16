import { Directive, Input, Optional, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { filter, map, delay } from 'rxjs/operators';
import { startWith, withLatestFrom } from 'rxjs/operators';
import { SidenavCollapseStore } from './sidenav-collapse/sidenav-collapse.state';
import { ESidenavState } from './sidenav-state.enum';
import { SidenavStore } from './sidenav.state';
import { Location } from '@angular/common';

@Directive()
export class SidenavItemBase {
    @Input()
    link?: string;
  
    @Input()
    public tooltip!: string | TemplateRef<any>;
  
    public readonly isLinkActivated$ = this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith({}),
      map(() => {
        return this.link ? this._location.path().startsWith(this.link) : false;
      })
    );
  
    public readonly collapseLevel$ = combineLatest([
      this._sidenavStore.sidenavState$,
      this._collapseStore?.level$ ?? of(null),
    ]).pipe(
      map(([state, level]) =>
        state === ESidenavState.OPENED && level !== null ? level + 1 : 0
      )
    );
  
    public readonly sidenavPaddingLeftState$ =
      this._sidenavStore.sidenavState$.pipe(
        delay(10),
        withLatestFrom(this.collapseLevel$),
        map(([state, level]) => {
          return {
            value: state,
            params: {
              paddingLeft: level * 16,
            },
          };
        })
      );
  
    public readonly canTooltipOpen$ = this._sidenavStore.sidenavState$.pipe(
      map((state) => state === ESidenavState.CLOSED)
    );
  
    constructor(
      private readonly _router: Router,
      private readonly _location: Location,
      private readonly _sidenavStore: SidenavStore,
      private readonly _collapseStore?: SidenavCollapseStore
    ) {}
  
    navigate(): void {
      if (!this.link) {
        return;
      }
      this._router.navigate([this.link]);
    }
}