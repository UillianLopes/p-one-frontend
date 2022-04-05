import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, OnDestroy, Optional, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';

import { eventOutsideOverlay } from '../oprators';
import { ColorPickerPopupComponent } from './color-picker-popup/color-picker-popup.component';

@Directive({
  selector: 'input[pOneColorPicker]',
  exportAs: 'pOneColorPicker',
})
export class ColorPickerDirective implements OnDestroy {
  private readonly _destroyed$ = new Subject();
  private _overlayRef?: OverlayRef;
  private get _color() {
    return (
      this._ngControl?.control?.value ?? this._elementRef.nativeElement.value
    );
  }
  private set _color(color: any) {
    if (this._ngControl && this._ngControl.control) {
      this._ngControl.control.setValue(color);
    } else {
      this._elementRef.nativeElement.value = color;
    }
  }

  constructor(
    private readonly _elementRef: ElementRef<HTMLInputElement>,
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef,
    @Optional() private readonly _ngControl: NgControl
  ) {}

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  toggle(): void {
    if (!this._overlayRef) {
      this.open();
      return;
    }

    this.close();
  }

  public open(): void {
    if (this._overlayRef) {
      return;
    }

    const overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef.nativeElement)
        .withPositions([
          {
            originX: 'start',
            overlayX: 'start',
            originY: 'bottom',
            overlayY: 'top',
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });

    const componentPortal = new ComponentPortal(
      ColorPickerPopupComponent,
      this._viewContainerRef
    );

    const componentRef = overlayRef.attach(componentPortal);
    componentRef.instance.setInitialColor(this._color);
    componentRef.instance.color$
      .pipe(
        takeUntil(overlayRef.detachments()),
        skip(1),
        distinctUntilChanged()
      )
      .subscribe((color) => {
        this._color = color;
      });

    eventOutsideOverlay(
      'click',
      overlayRef,
      this._elementRef.nativeElement
    ).subscribe(() => {
      this.close();
    });

    this._overlayRef = overlayRef;
  }

  public close(): void {
    if (!this._overlayRef) {
      return;
    }

    this._overlayRef.detach();
    this._overlayRef = undefined;
  }
}
