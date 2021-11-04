import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class DialogRef {
  public readonly afterClosed$ = new Subject<any>();

  constructor(private readonly _overlayRef: OverlayRef) {}

  close(data?: any): void {
    this._overlayRef.detach();
    this.afterClosed$.next(data);
    this.afterClosed$.complete();
  }
}
