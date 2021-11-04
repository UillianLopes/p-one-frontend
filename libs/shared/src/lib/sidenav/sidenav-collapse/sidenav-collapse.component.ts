import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { delay, filter, map, startWith, takeUntil, withLatestFrom } from 'rxjs/operators';

import { SidenavFacade } from '../+state/sidenav.facade';
import { DestroyableMixin } from '../../..';
import { ESidenavState } from '../sidenav-state.enum';
import { sidenavColllapseAnimation, sidenavColllapseIconAnimation } from './sidenav-collapse.animations';

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
  animations: [sidenavColllapseAnimation, sidenavColllapseIconAnimation],
})
export class SidenavCollapseComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  @Input()
  link?: string;
  private readonly _state$ = new BehaviorSubject<SidenaCollapseState>({
    state: ESidenavState.CLOSED,
  });

  public readonly state$ = combineLatest([
    this._sidenavFacade.state$.pipe(delay(10)),
    this._state$,
  ]).pipe(
    map(([sidenavState, state]) => {
      return sidenavState === ESidenavState.OPENED
        ? state.state
        : ESidenavState.CLOSED;
    })
  );

  private readonly _toggle$ = new Subject();
  private readonly _open$ = new Subject();
  private readonly _close$ = new Subject();
  private readonly _navigate$ = new Subject();

  public readonly isLinkActivated$ = this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith({}),
    map(() => {
      return this.link ? this._location.path().startsWith(this.link) : false;
    })
  );

  public readonly isLinkActivatedAndCollapseClosed$ = combineLatest([
    this.isLinkActivated$,
    this.state$,
  ]).pipe(
    map(([isLinkActivated, state]) => {
      return isLinkActivated && state == ESidenavState.CLOSED;
    })
  );

  

  constructor(
    private readonly _sidenavFacade: SidenavFacade,
    private readonly _router: Router,
    private readonly _location: Location
  ) {
    super();
  }

  public close(): void {
    this._close$.next();
  }

  public open(): void {
    this._open$.next();
  }

  public toggle(): void {
    this._toggle$.next();
  }

  public ngOnInit(): void {
    this._open$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: () => {
        this._setState({ state: ESidenavState.OPENED });
        this._navigate$.next();
      },
    });

    this._navigate$
      .pipe(
        takeUntil(this.destroyed$),
        filter(() => !!this.link),
        withLatestFrom(this.isLinkActivated$),
        filter(([_, isLinkActivated]) => !isLinkActivated)
      )
      .subscribe({
        next: () => this._router.navigate([this.link]),
      });

    this._close$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: () => this._setState({ state: ESidenavState.CLOSED }),
    });

    this._toggle$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(
          this.state$,
          this._sidenavFacade.state$,
          this.isLinkActivated$
        ),
        filter(([_, __, sidenavState]) => sidenavState == ESidenavState.OPENED)
      )
      .subscribe({
        next: ([_, state, __, isLinkActivated]) => {
          switch (state) {
            case ESidenavState.CLOSED:
              this.open();
              break;
            case ESidenavState.OPENED:
              if (isLinkActivated) {
                this.close();
              } else {
                this._navigate$.next();
              }
              break;
          }
        },
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private _setState(state: Partial<SidenaCollapseState>): void {
    this._state$.next({
      ...this._state$.value,
      ...state,
    });
  }
}
