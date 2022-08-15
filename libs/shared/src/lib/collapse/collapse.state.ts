import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, tap, withLatestFrom } from 'rxjs';

export enum CollapseStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}

export interface CollapseState {
  status: CollapseStatus;
}

@Injectable()
export class CollapseStore extends ComponentStore<CollapseState> {
  public readonly status$ = this.select(({ status }) => status);

  constructor() {
    super({
      status: CollapseStatus.CLOSED,
    });
  }

  public readonly setStatus = this.updater((state, status: CollapseStatus) => ({
    ...state,
    status,
  }));

  public readonly toggle = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.status$),
      map(([_, status]) =>
        status === CollapseStatus.OPENED
          ? CollapseStatus.CLOSED
          : CollapseStatus.OPENED
      ),
      tap((status) => this.patchState({ status }))
    )
  );
}
