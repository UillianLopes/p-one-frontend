import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  TemplateRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { eventOutsideOverlay } from '../oprators';
import { ContextMenuComponent } from './context-menu.component';
import { CONTEXT_MENU_TEMPLATE } from './context-menu.constants';

@Directive({
  selector: '[pOneContextMenuHost]',
  host: {
    class: 'p-one-context-menu-host',
  },
})
export class ContextMenuHostDirective {
  private _overlayRef?: OverlayRef;

  @Input('pOneContextMenuHost')
  contextMenuTemplate!: TemplateRef<any>;

  @Input() public followMouseCursor = false;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _el: ElementRef<HTMLElement>,
    private readonly _injector: Injector
  ) {}

  private getPositionStrategy($event: MouseEvent) {
    if (this.followMouseCursor) {
      return this._overlay
        .position()
        .global()
        .left($event.clientX - 16 + 'px')
        .top(
          this._el.nativeElement.getBoundingClientRect().top +
            this._el.nativeElement.getBoundingClientRect().height +
            'px'
        );
    }

    return this._overlay
      .position()
      .flexibleConnectedTo(this._el)
      .withPositions([
        {
          overlayX: 'center',
          originX: 'center',
          overlayY: 'top',
          originY: 'bottom',
        },
      ]);
  }

  @HostListener('contextmenu', ['$event'])
  open($event: MouseEvent): void {
    $event.preventDefault();
    if (this._overlayRef) {
      return;
    }

    const overlayRef = this._overlay.create({
      positionStrategy: this.getPositionStrategy($event),
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: false,
    });

    const componentPortal = new ComponentPortal(
      ContextMenuComponent,
      null,
      Injector.create({
        providers: [
          {
            provide: CONTEXT_MENU_TEMPLATE,
            useValue: this.contextMenuTemplate,
          },
        ],
        parent: this._injector,
      })
    );

    overlayRef.attach(componentPortal);

    overlayRef
      ?.detachments()
      .pipe(take(1))
      .subscribe(() => {
        this._overlayRef = undefined;
      });

    if (this.followMouseCursor) {
      fromEvent<MouseEvent>(this._el.nativeElement, 'mousemove')
        .pipe(takeUntil(overlayRef.detachments()))
        .subscribe(($event) => {
          const { top, height } =
            this._el.nativeElement.getBoundingClientRect();

          const newStrategy = this._overlay
            .position()
            .global()
            .top(top + height + 'px')
            .left($event.clientX - 16 + 'px');

          overlayRef.updatePositionStrategy(newStrategy);
        });
    }

    eventOutsideOverlay(
      'click',
      overlayRef,
      this._el.nativeElement
    ).subscribe((_) => overlayRef.detach());

    eventOutsideOverlay(
      'contextmenu',
      overlayRef,
      this._el.nativeElement
    ).subscribe((_) => overlayRef.detach());

    this._overlayRef = overlayRef;
  }
}
