import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { SidenavFacade } from '../+state/sidenav.facade';
import { ESidenavMode } from '../sidenav-mode.enum';
import { sidenavContainerContentPaddingAnimation } from './sidenav-container.animations';

@Component({
  selector: 'p-one-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss'],
  animations: [sidenavContainerContentPaddingAnimation],
})
export class SidenavContainerComponent {
  @Input()
  set mode(v: ESidenavMode) {
    this._facade.setMode(v);
  }

  public readonly sidenav$ = new Subject<HTMLElement>();

  public readonly isFixed$ = this._facade.isFixed$;
  public readonly isFloating$ = this._facade.isFloating$;
  public readonly isOpened$ = this._facade.isOpened$;
  public readonly isClosed$ = this._facade.isClosed$;

  public readonly state$ = this._facade.state$.pipe(
    withLatestFrom(this._facade.sidenavWidth$, this._facade.mode$),
    map(([value, sidenavWidth, mode]) => {
      return {
        value,
        params: {
          sidenavWidth: mode === ESidenavMode.FIXED ? sidenavWidth : '50px',
        },
      };
    }),
    tap((data) => console.log('ANIMATION STATE -> ', data))
  );

  constructor(private readonly _facade: SidenavFacade) {}

  toggle(): void {
    this._facade.toggle();
  }
}
