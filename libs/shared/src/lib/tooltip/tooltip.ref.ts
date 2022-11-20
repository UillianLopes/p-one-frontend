import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable()
export class TooltipRef {
  constructor(
    private readonly _overlayRef: OverlayRef
  ) {}

  public close() {
    this._overlayRef.detach();
  }
}
