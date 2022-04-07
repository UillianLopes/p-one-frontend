import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Optional, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { delay, filter, map, startWith, withLatestFrom } from 'rxjs/operators';

import { StopPropagationDirective } from '../../directives';
import { SidenavCollapseStore } from '../sidenav-collapse/sidenav-collapse.state';
import { ESidenavState } from '../sidenav-state.enum';
import { SidenavStore } from '../sidenav.state';
import { sidenavItemPaddingLeftAnimation } from './sidenav-item.animations';

@Component({
  selector: 'p-one-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidenavItemPaddingLeftAnimation],
})
export class SidenavItemComponent extends StopPropagationDirective {
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
    @Optional() private readonly _collapseStore: SidenavCollapseStore
  ) {
    super();
  }

  navigate(): void {
    if (!this.link) {
      return;
    }
    this._router.navigate([this.link]);
  }
}
