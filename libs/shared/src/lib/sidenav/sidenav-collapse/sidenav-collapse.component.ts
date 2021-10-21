import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

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
  private readonly _state$ = new BehaviorSubject<SidenaCollapseState>({
    state: ESidenavState.CLOSED,
  });

  public readonly state$ = this._state$.pipe(map((state) => state.state));

  private readonly _toggle$ = new Subject();
  private readonly _open$ = new Subject();
  private readonly _close$ = new Subject();

  constructor(private readonly _sidenavFacade: SidenavFacade) {
    super();
  }

  public setState(state: Partial<SidenaCollapseState>): void {
    this._state$.next({
      ...this._state$.value,
      ...state,
    });
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
    this._open$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(this.state$),
        filter(([_, state]) => state === ESidenavState.CLOSED),
        tap(() => console.log('TENTOU ABRIR => '))
      )
      .subscribe({
        next: () => this.setState({ state: ESidenavState.OPENED }),
      });

    this._close$
      .pipe(
        takeUntil(this.destroyed$),
        withLatestFrom(this.state$),
        filter(([_, state]) => state === ESidenavState.OPENED)
      )
      .subscribe({
        next: () => this.setState({ state: ESidenavState.CLOSED }),
      });

    this._toggle$
      .pipe(
        withLatestFrom(this.state$, this._sidenavFacade.state$),
        takeUntil(this.destroyed$),
        filter(([_, __, sidenavState]) => sidenavState == ESidenavState.OPENED)
      )
      .subscribe({
        next: ([_, state]) => {
          switch (state) {
            case ESidenavState.CLOSED:
              this.open();
              break;
            case ESidenavState.OPENED:
              this.close();
              break;
          }
        },
      });

    this._sidenavFacade.state$
      .pipe(
        delay(10),
        takeUntil(this.destroyed$),
        filter((state) => state === ESidenavState.CLOSED)
      )
      .subscribe({
        next: () => this.close(),
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
