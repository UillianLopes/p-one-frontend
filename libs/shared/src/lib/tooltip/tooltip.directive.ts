import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';

import { eventOutsideOverlay } from '../oprators';
import { TooltipComponent } from './tooltip.component';
import { TOOLTIP_CONFIG, TOOLTIP_DATA, TOOLTIP_TEMPLATE } from './tooltip.constants';
import { TooltipRef } from './tooltip.ref';

export const BOTTOM: ConnectedPosition = {
  originX: 'center',
  overlayX: 'center',
  overlayY: 'top',
  originY: 'bottom',
  offsetY: 4,
  weight: 1,
};

export const RIGHT: ConnectedPosition = {
  originX: 'end',
  overlayX: 'start',
  overlayY: 'center',
  originY: 'center',
  offsetX: 4,
  weight: 1,
};

export const LEFT: ConnectedPosition = {
  originX: 'start',
  overlayX: 'end',
  overlayY: 'center',
  originY: 'center',
  offsetX: -8,
  weight: 1,
};

export const TOP: ConnectedPosition = {
  originX: 'center',
  overlayX: 'center',
  overlayY: 'bottom',
  originY: 'top',
  offsetY: 4,
  weight: 1,
};

export type TooltipPosition = 'bottom' | 'right' | 'left' | 'top';

const POSITIONS = new Map<TooltipPosition, ConnectedPosition[]>([
  ['bottom', [BOTTOM, TOP, RIGHT, LEFT]],
  ['top', [TOP, BOTTOM, RIGHT, LEFT]],
  ['left', [LEFT, BOTTOM, TOP, RIGHT]],
  ['right', [RIGHT, BOTTOM, TOP, LEFT]],
]);

@Directive({
  selector: '[pOneTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('pOneTooltip')
  public tooltip!: TemplateRef<any> | string;
  @Input()
  public data: any;
  @Input()
  public trigger: 'hover' | 'click' = 'hover';
  @Input()
  public tooltipPosition: TooltipPosition = 'bottom';
  @Input()
  public canTooltipOpen = true;
  @Input()
  public autoClose = true;
  @Input()
  public useTooltipStyle = true;

  private _overlayRef?: OverlayRef;

  private _mouseLeaveEventDispatcher?: () => void;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _renderer2: Renderer2,
    private readonly _injector: Injector
  ) {}

  public ngOnDestroy(): void {
    this._close();
  }

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
    if (this._overlayRef || !this.tooltip || !this.canTooltipOpen) {
      return;
    }

    const position = POSITIONS.get(this.tooltipPosition) ?? [BOTTOM];

    const overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef.nativeElement)
        .withPositions([...position]),
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
            useValue: this.tooltip instanceof TemplateRef ? this.tooltip : null,
          },
          {
            provide: TOOLTIP_DATA,
            useValue: typeof this.tooltip === 'string' ? this.tooltip : null,
          },
          {
            provide: TOOLTIP_CONFIG,
            useValue: {
              useTooltipStyle: this.useTooltipStyle,
              tooltipPosition: ''
            },
          },
          {
            provide: TooltipRef,
            useValue: tooltipRef,
          },
        ],
      })
    );

    const componentRef = overlayRef.attach(componentPortal);

    componentRef.instance.open();

    componentRef.instance.closed$.pipe(take(1)).subscribe(() => this._close());

    if (this.autoClose) {
      if (this.trigger == 'click') {
        eventOutsideOverlay('click', overlayRef, this._elementRef.nativeElement)
          .pipe(takeUntil(overlayRef.detachments()))
          .subscribe(() => {
            componentRef.instance.close();
          });
      } else {
        this._mouseLeaveEventDispatcher = this._renderer2.listen(
          this._elementRef.nativeElement,
          'mouseleave',
          () => {
            componentRef.instance.close();
          }
        );
      }
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
