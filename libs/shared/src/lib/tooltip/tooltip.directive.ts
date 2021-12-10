import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { eventOutsideOverlay } from '../oprators';
import { TooltipComponent } from './tooltip.component';
import { TOOLTIP_TEMPLATE } from './tooltip.constants';
import { TooltipRef } from './tooltip.ref';

@Directive({
  selector: '[pOneTooltip]',
})
export class TooltipDirective {
  @Input('pOneTooltip')
  public template!: TemplateRef<any>;

  @Input()
  public trigger: 'hover' | 'click' = 'click';

  private _overlayRef?: OverlayRef;

  private _mouseLeaveEventDispatcher?: () => void;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _renderer2: Renderer2,
    private readonly _injector: Injector
  ) {}

  @HostListener('click')
  public click(): void {
    if (this.trigger != 'click') {
      return;
    }

    this._close();
    this._open();
  }

  @HostListener('mouseenter')
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
            offsetY: 8,
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });

    const tooltipRef = new TooltipRef(overlayRef);
    const componentPortal = new ComponentPortal(
      TooltipComponent,
      this._viewContainerRef,
      Injector.create({
        parent: this._injector,
        providers: [
          {
            provide: TOOLTIP_TEMPLATE,
            useValue: this.template,
          },
          {
            provide: TooltipRef,
            useValue: tooltipRef,
          },
        ],
      })
    );

    overlayRef.attach(componentPortal);

    if (this.trigger == 'click') {
      eventOutsideOverlay('click', overlayRef, this._elementRef.nativeElement)
        .pipe(takeUntil(overlayRef.detachments()))
        .subscribe(() => {
          this._close();
        });
    } else {
      this._mouseLeaveEventDispatcher = this._renderer2.listen(
        this._elementRef.nativeElement,
        'mouseleave',
        () => {
          this._close();
        }
      );
    }

    this._overlayRef = overlayRef;
  }

  private _close(): void {
    if (!this._overlayRef) {
      return;
    }

    this._overlayRef.detach();
    this._overlayRef = undefined;
    if (this._mouseLeaveEventDispatcher) {
      this._mouseLeaveEventDispatcher();
      this._mouseLeaveEventDispatcher = undefined;
    }
  }
}
