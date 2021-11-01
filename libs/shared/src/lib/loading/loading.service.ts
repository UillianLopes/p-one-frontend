import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';

import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadingService {
  private _overlayRef?: OverlayRef;
  private _componentRef?: ComponentRef<LoadingComponent>;

  constructor(private readonly _overlay: Overlay) {}

  open(): void {
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global(),
    });

    this._componentRef = this._overlayRef.attach(
      new ComponentPortal(LoadingComponent)
    );
  }

  close(): void {
    this._componentRef?.destroy();
    this._overlayRef?.detach();
  }
}
