import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavCollapseStore } from '../sidenav-collapse/sidenav-collapse.state';
import { SidenavItemBase } from '../sidenav-item.base';
import { SidenavStore } from '../sidenav.state';
import { sidenavItemPaddingLeftAnimation } from './sidenav-item.animations';
import { SidenavItemColor, SidenavItemStore } from './sidenav-item.state';

@Component({
  selector: 'p-one-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidenavItemPaddingLeftAnimation],
  providers: [SidenavItemStore],
})
export class SidenavItemComponent extends SidenavItemBase {
  public readonly class$ = this._store.class$;

  @Input()
  set color(color: SidenavItemColor) {
    this._store.setColor(color);
  }

  constructor(
    private readonly _store: SidenavItemStore,
    router: Router,
    location: Location,
    sidenavStore: SidenavStore,
    @Optional() sidenavCollapseStore: SidenavCollapseStore
  ) {
    super(router, location, sidenavStore, sidenavCollapseStore);
  }
}
