import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DestroyableMixin } from '../../..';
import { ESidenavMode } from '../sidenav-mode.enum';
import { ESidenavState } from '../sidenav-state.enum';
import { SidenavStore } from '../sidenav.state';
import { sidenavContainerContentPaddingAnimation } from './sidenav-container.animations';

@Component({
  selector: 'p-one-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss'],
  animations: [sidenavContainerContentPaddingAnimation],
  providers: [SidenavStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavContainerComponent extends DestroyableMixin() {
  @Input()
  set mode(mode: ESidenavMode) {
    this._store.setMode(mode);
  }

  public readonly isFixed$ = this._store.isFixed$;
  public readonly isFloating$ = this._store.isFloating$;
  public readonly isOpened$ = this._store.isOpened$;
  public readonly isClosed$ = this._store.isClosed$;
  public readonly paddingLeft$ = combineLatest([
    this._store.sidenavState$,
    this._store.sidenavWidth$,
    this._store.mode$,
  ]).pipe(
    map(([value, sidenavWidth, mode]) => {
      return mode === ESidenavMode.FIXED && value === ESidenavState.OPENED
        ? sidenavWidth + 32
        : sidenavWidth + 16;
    })
  );

  constructor(
    private readonly _store: SidenavStore
  ) {
    super();
  }

  toggle(): void {
    this._store.toggle();
  }
}
