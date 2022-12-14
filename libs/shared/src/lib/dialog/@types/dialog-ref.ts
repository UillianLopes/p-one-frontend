import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

import { DialogContainerComponent } from '../dialog-container/dialog-container.component';

export interface IDialogRef {
  dialogId: string;
  afterClosed$: Subject<any>;
  close<T>(data: T): void;
}

export class DialogRef<T> implements IDialogRef {
  readonly afterClosed$ = new Subject<any>();
  componentInstance: T | null = null;
  private containerInstance: DialogContainerComponent<T> | null = null;

  constructor(
    private readonly _overlayRef: OverlayRef,
    public readonly dialogId: string
  ) {}

  setComponentInstance(
    componentInstance: T,
    containerInstance: DialogContainerComponent<T>
  ): void {
    this.componentInstance = componentInstance;
    this.containerInstance = containerInstance;
  }

  close<R>(data?: R): void {
    if (this.containerInstance) {
      this.containerInstance
        .requestClose()
        .subscribe({
          next: () => {
            this._close(data)
          },
        });
    } else {
      this._close(data)
    }
  }

  private _close<R>(data?: R): void {
    this._overlayRef.detach();
    this.afterClosed$.next(data);
    this.afterClosed$.complete();
  }
}
