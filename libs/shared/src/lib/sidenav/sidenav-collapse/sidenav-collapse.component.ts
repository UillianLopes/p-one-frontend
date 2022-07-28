import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { combineLatest } from 'rxjs';
import { delay, map, withLatestFrom } from 'rxjs/operators';

import { DestroyableMixin } from '../../..';
import { ESidenavState } from '../sidenav-state.enum';
import { SidenavStore } from '../sidenav.state';
import {
  sidenavCollapseLeftPaddingAnimation,
  sidenavColllapseAnimation,
  sidenavColllapseIconAnimation,
} from './sidenav-collapse.animations';
import { SidenavCollapseStore } from './sidenav-collapse.state';

export interface SidenaCollapseState {
  state: ESidenavState;
}
@Component({
  selector: 'p-one-sidenav-collapse',
  templateUrl: './sidenav-collapse.component.html',
  styleUrls: ['./sidenav-collapse.component.scss'],
  host: {
    class: 'p-one-sidenav-collapse',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    sidenavColllapseAnimation,
    sidenavColllapseIconAnimation,
    sidenavCollapseLeftPaddingAnimation,
  ],
  providers: [SidenavCollapseStore],
})
export class SidenavCollapseComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  ESidenavState = ESidenavState;
  @Input()
  set link(link: string) {
    this._store.setLink(link);
  }

  public readonly collapseState$ = this._store.collapseState$;
  public readonly isLinkActivated$ = this._store.isLinkActivated$;

  public readonly isLinkActivatedAndCollapseClosed$ = combineLatest([
    this.isLinkActivated$,
    this.collapseState$,
  ]).pipe(
    delay(10),
    map(([isLinkActivated, state]) => {
      return isLinkActivated && state == ESidenavState.CLOSED;
    })
  );

  public readonly level$ = combineLatest([
    this._sidenavStore.sidenavState$,
    this._store.level$,
  ]).pipe(
    map(([state, level]) => (state === ESidenavState.OPENED ? level : 0))
  );

  public readonly sidenavPaddingLeftState$ =
    this._sidenavStore.sidenavState$.pipe(
      delay(10),
      withLatestFrom(this.level$),
      map(([state, level]) => {
        return {
          value: state,
          params: {
            paddingLeft: level * 16,
          },
        };
      })
    );

  @Input()
  public tooltip!: TemplateRef<any> | string;

  public readonly canTooltipOpen$ = this._sidenavStore.sidenavState$.pipe(
    map((state) => state === ESidenavState.CLOSED)
  );

  constructor(
    private readonly _store: SidenavCollapseStore,
    private readonly _sidenavStore: SidenavStore
  ) {
    super();
  }

  public close(): void {
    this._store.close();
  }

  public open(): void {
    this._store.open();
  }

  public toggle(): void {
    this._store.toggle();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
