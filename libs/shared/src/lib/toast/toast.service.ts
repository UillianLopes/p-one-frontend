import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { v4 } from 'uuid';

import { TOAST_OPTIONS, TOAST_TEMPLATE, TOAST_TEXT, ToastOptions } from './@types/toast.options';
import { TOAST_REF, ToastRef } from './@types/toast.ref';
import { ToastComponent } from './toast.component';

@Injectable()
export class ToastService {
  readonly toasts: {
    [toasId: string]:
      | {
          toastRef: ToastRef;
          overlayRef: OverlayRef;
        }
      | undefined;
  } = {};

  constructor(
    private readonly _overlay: Overlay,
    private readonly _injector: Injector
  ) {}

  open(
    content: TemplateRef<any> | string,
    options?: Partial<ToastOptions>
  ): { toastId: string; toastRef: ToastRef } {
    options = {
      duration: 5000,
      color: 'primary',
      ...(options ?? {}),
    };

    const overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .global()
        .bottom('16px')
        .right('16px'),
    });

    const toastRef = new ToastRef();

    const componentPortal = new ComponentPortal(
      ToastComponent,
      null,
      Injector.create({
        parent: this._injector,
        providers: [
          {
            provide: TOAST_OPTIONS,
            useValue: options,
          },
          {
            provide: TOAST_TEMPLATE,
            useValue: content instanceof TemplateRef ? content : null,
          },
          {
            provide: TOAST_TEXT,
            useValue: typeof content === 'string' ? content : null,
          },
          {
            provide: TOAST_REF,
            useValue: toastRef,
          },
        ],
      })
    );

    overlayRef.attach(componentPortal);

    const toastId = v4();

    this.toasts[toastId] = {
      overlayRef: overlayRef,
      toastRef: toastRef,
    };

    toastRef.closed$.pipe(takeUntil(overlayRef.detachments())).subscribe(() => {
      this.toasts[toastId]?.overlayRef?.detach();
    });

    timer(options.duration)
      .pipe(take(1), takeUntil(overlayRef.detachments()))
      .subscribe((_) => this.toasts[toastId]?.toastRef?.close());

    return {
      toastId,
      toastRef,
    };
  }

  close(toastId: string) {
    const toast = this.toasts[toastId];

    if (!toast) {
      return;
    }

    const { toastRef } = toast;

    toastRef.close();

    this.toasts[toastId] = undefined;
  }
}
