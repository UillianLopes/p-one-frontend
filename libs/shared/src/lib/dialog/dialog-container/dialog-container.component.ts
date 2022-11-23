import { AnimationEvent } from '@angular/animations';
import { CdkPortalOutletAttachedRef, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../../@mixins';
import { DialogOptions, PONE_DIALOG_CONTENT, PONE_DIALOG_OPTIONS } from '../@types/dialog-options';
import { DialogRef } from '../@types/dialog-ref';
import { dialogAnimations } from './dialog-container.animations';

export interface DialogContainerState {
  portal: ComponentPortal<any>;
  options: DialogOptions;
  status: 'OPENED' | 'CLOSED';
}

@Component({
  selector: 'p-one-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dialogAnimations]
})
export class DialogContainerComponent<T> extends DestroyableMixin() implements OnInit {
  private readonly _onCloseAnimationDone$ = new Subject<boolean>();
  private readonly _state$ = new BehaviorSubject<DialogContainerState>({
    portal: this._content,
    options: this._dialogOptions,
    status: 'CLOSED'
  });

  public readonly portal$ = this._state$.pipe(map((state) => state.portal));
  public readonly options$ = this._state$.pipe(map((state) => state.options));

  public readonly minWidth$ = this.options$.pipe(
    map((options) => options?.minWidth ?? '500px')
  );

  public readonly maxWidth$ = this.options$.pipe(
    map((options) => options?.maxWidth ?? '100%')
  );

  public readonly status$ = this._state$.pipe(map(({ status }) => status));


  constructor(
    @Inject(PONE_DIALOG_CONTENT)
    private readonly _content: ComponentPortal<ComponentType<T>>,
    @Inject(PONE_DIALOG_OPTIONS)
    private readonly _dialogOptions: DialogOptions,
    private readonly _dialogRef: DialogRef<T>
  ) {
    super();
  }

  ngOnInit(): void {
    this.open();
  }

  onAttached(obj: CdkPortalOutletAttachedRef): void {
    if (obj instanceof ComponentRef<T>) {
      this._dialogRef.setComponentInstance(obj.instance, this);
    }
  }

  onAnimationDone({ toState }: AnimationEvent) {
    if (toState === 'CLOSED') {
      this._onCloseAnimationDone$.next(true);
    }
  }

  open() {
    this._state$.next({
      ...this._state$.value,
      status: 'OPENED'
    })
  }

  requestClose(): Observable<boolean> {
    this._state$.next({
      ...this._state$.value,
      status: 'CLOSED'
    });

    return this._onCloseAnimationDone$
      .pipe(take(1), takeUntil(this.destroyed$));
  }
}
