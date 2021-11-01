import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

import { StopPropagationDirective } from '../../directives';

@Component({
  selector: 'p-one-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavItemComponent extends StopPropagationDirective {
  @Input()
  link?: string;

  public readonly isLinkActivated$ = this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith({}),
    map(() => {
      return this.link ? this._location.path().startsWith(this.link) : false;
    })
  );

  constructor(
    private readonly _router: Router,
    private readonly _location: Location
  ) {
    super();
  }

  navigate(): void {
    this._router.navigate([this.link]);
  }
}
