import { Component, InjectionToken, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { filter, Observable, takeUntil } from 'rxjs';

import { DestroyableMixin } from '../@mixins';
import { collapseAnimation } from './collapse.animations';
import { CollapseStatus, CollapseStore } from './collapse.state';

export const COLLAPSE = new InjectionToken<Collapsable>('COLLAPSE');

export interface Collapsable {
  status$: Observable<CollapseStatus>;
  toggle: () => void;
}

@Component({
  selector: 'p-one-collapse,[p-one-collapse]',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  animations: [collapseAnimation],
  providers: [
    CollapseStore,
    { provide: COLLAPSE, useExisting: CollapseComponent },
  ],
})
export class CollapseComponent
  extends DestroyableMixin()
  implements OnInit, Collapsable
{
  @Input()
  set status(status: CollapseStatus) {
    this._store.setStatus(status);
  }

  public readonly status$ = this._store.status$;

  constructor(
    private readonly _store: CollapseStore,
    @Optional() @SkipSelf() private readonly _parentStore: CollapseStore
  ) {
    super();
  }

  public toggle(): void {
    this._store.toggle();
  }

  public ngOnInit(): void {
    if (this._parentStore) {
      this._parentStore.status$
        .pipe(
          takeUntil(this.destroyed$),
          filter((status) => status === CollapseStatus.CLOSED)
        )
        .subscribe((status) => {
          this._store.setStatus(status);
        });
    }
  }
}
