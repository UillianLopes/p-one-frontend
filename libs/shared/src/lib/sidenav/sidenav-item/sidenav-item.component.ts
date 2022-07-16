import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, Optional
} from '@angular/core';
import { Router } from '@angular/router';

import { SidenavCollapseStore } from '../sidenav-collapse/sidenav-collapse.state';
import { SidenavItemBase } from '../sidenav-item.base';
import { SidenavStore } from '../sidenav.state';
import { sidenavItemPaddingLeftAnimation } from './sidenav-item.animations';

@Component({
  selector: 'p-one-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sidenavItemPaddingLeftAnimation],
})
export class SidenavItemComponent extends SidenavItemBase {
  constructor(
    router: Router,
    location: Location,
    sidenavStore: SidenavStore,
    @Optional() sidenavCollapseStore: SidenavCollapseStore
  ) {
    super(router, location, sidenavStore, sidenavCollapseStore);
  }
}
