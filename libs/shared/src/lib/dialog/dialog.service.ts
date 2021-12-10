import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, NgZone } from '@angular/core';
import { v4 } from 'uuid';

import { DialogOptions, PONE_DIALOG_CONTENT, PONE_DIALOG_DATA, PONE_DIALOG_OPTIONS } from './@types/dialog-options';
import { DialogRef } from './@types/dialog-ref';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';

@Injectable()
export class DialogService {
  private _dialogs: {
    [dialogId: string]: DialogRef | undefined;
  } = {};

  constructor(
    private readonly _overlay: Overlay,
    private readonly _injector: Injector,
    private readonly _ngZone: NgZone
  ) {}

  open<T>(
    component: ComponentType<T>,
    options: DialogOptions,
    data?: any
  ): DialogRef {
    return this._ngZone.run(() => {
      const overlayRef = this._overlay.create({
        hasBackdrop: options.hasBackdrop,
        panelClass: 'p-one-dialog-container__pane',
      });
      const dialogId = v4();

      const dialogRef = new DialogRef(overlayRef, dialogId);

      const componentInjector = Injector.create({
        providers: [
          {
            provide: PONE_DIALOG_DATA,
            useValue: data,
          },
          {
            provide: DialogRef,
            useValue: dialogRef,
          },
        ],
        parent: this._injector,
      });

      const componentPortal = new ComponentPortal(
        component,
        null,
        componentInjector
      );

      const containerInjector = Injector.create({
        providers: [
          {
            provide: PONE_DIALOG_OPTIONS,
            useValue: options,
          },
          {
            provide: PONE_DIALOG_CONTENT,
            useValue: componentPortal,
          },
        ],
        parent: this._injector,
      });

      const containerPortal = new ComponentPortal(
        DialogContainerComponent,
        null,
        containerInjector
      );

      overlayRef.attach(containerPortal);

      this._dialogs = {
        ...this._dialogs,
        [dialogId]: dialogRef,
      };

      return dialogRef;
    });
  }

  close(dialogId?: string, data?: any) {
    this._ngZone.run(() => {
      if (!dialogId) {
        return;
      }

      const dialogRef = this._dialogs[dialogId];

      if (!dialogRef) {
        return;
      }

      dialogRef.close(data);

      this._dialogs = {
        ...this._dialogs,
        [dialogId]: undefined,
      };
    });
  }
}
