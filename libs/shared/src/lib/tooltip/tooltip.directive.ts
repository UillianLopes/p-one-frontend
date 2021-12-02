import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { eventOutsideOverlay } from '../oprators';

@Directive({
  selector: '[pOneTooltip]',
})
export class TooltipDirective {
  @Input('pOneTooltip')
  public template!: TemplateRef<any>;

  public trigger: 'hover' | 'click' = 'click';

  private _overlayRef?: OverlayRef;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('click')
  public click(): void {
    if (this.trigger != 'click') {
      return;
    }

    this._close();
    this._open();
  }

  @HostListener('hover')
  public hover(): void {
    if (this.trigger != 'hover') {
      return;
    }

    this._open();
  }

  private _open(): void {
    if (this._overlayRef) {
      return;
    }

    const overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef.nativeElement)
        .withPositions([
          {
            originX: 'center',
            overlayX: 'center',
            overlayY: 'top',
            originY: 'bottom',
            offsetY: 8
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });

    const componentPortal = new TemplatePortal(
      this.template,
      this._viewContainerRef
    );

    overlayRef.attach(componentPortal);

    eventOutsideOverlay('click', overlayRef, this._elementRef.nativeElement)
      .pipe(takeUntil(overlayRef.detachments()))
      .subscribe(() => {
        this._close();
      });

    this._overlayRef = overlayRef;
  }

  private _close(): void {
    if (!this._overlayRef) {
      return;
    }

    this._overlayRef.detach();
    this._overlayRef = undefined;
  }
}
