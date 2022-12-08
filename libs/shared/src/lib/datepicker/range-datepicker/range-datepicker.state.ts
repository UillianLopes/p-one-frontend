import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, NgZone, ViewContainerRef } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map, skip, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { DatepickerCalendarComponent } from '../datepicker-calendar/datepicker-calendar.component';
import { DatepickerMode } from '../datepicker-mode.enum';
import { RangepickerValue } from '../datepicker.data';

export interface RangePickerState {
  value?: RangepickerValue;

  element?: HTMLElement;
  overlayRef?: OverlayRef;
}

@Injectable()
export class RangepickerStore extends ComponentStore<RangePickerState> {
  public readonly value$ = this.select(({ value }) => value);
  public readonly element$ = this.select(({ element }) => element);
  public readonly overlayRef$ = this.select(({ overlayRef }) => overlayRef);
  public readonly isPopupOpened$ = this.select(
    ({ overlayRef }) => !!overlayRef
  );

  public readonly beginDisplayValue$ = this.select(this.value$, (value) =>
    value && value.begin
      ? DateTime.fromJSDate(value.begin).toFormat('yyyy-MM-dd')
      : undefined
  );

  public readonly endDisplayValue$ = this.select(this.value$, (value) =>
    value && value.end
      ? DateTime.fromJSDate(value.end).toFormat('yyyy-MM-dd')
      : undefined
  );

  constructor(
    private readonly _overlay: Overlay,
    private readonly _ngZone: NgZone,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _injector: Injector
  ) {
    super({});
  }

  public readonly setValue = this.updater((state, value: RangepickerValue) => ({
    ...state,
    value,
  }));

  public readonly setBegin = this.updater(({ value, ...s }, begin: Date) => {
    return {
      ...s,
      value: {
        ...(value ?? {}),
        begin,
      },
    };
  });
  public readonly setEnd = this.updater(({ value, ...s }, end: Date) => {
    return {
      ...s,
      value: {
        ...(value ?? {}),
        end,
      },
    };
  });

  public readonly setElement = this.updater((state, element: HTMLElement) => ({
    ...state,
    element,
  }));

  public readonly setOverlayRef = this.updater(
    (state, overlayRef: OverlayRef) => {
      return {
        ...state,
        overlayRef,
      };
    }
  );

  public readonly resetOverlayRef = this.updater((state) => {
    return {
      ...state,
      overlayRef: undefined,
    };
  });

  public readonly close = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.overlayRef$),
      switchMap(
        ([_, overleyRef]) =>
          new Observable((observer) => {
            if (!overleyRef) {
              return;
            }

            this._ngZone.run(() => {
              overleyRef.detach();
              this.resetOverlayRef();
            });

            observer.next();
          })
      )
    )
  );

  public readonly toggle = this.effect((event$) =>
    event$.pipe(
      withLatestFrom(this.element$, this.overlayRef$, this.value$),
      tap(([__, element, overlayRef, value]) => {
        if (!element) {
          return;
        }

        this._ngZone.run(() => {
          if (overlayRef) {
            this.close();
            return;
          }

          const oref = this._overlay.create({
            positionStrategy: this._overlay
              .position()
              .flexibleConnectedTo(element)
              .withPositions([
                {
                  originX: 'center',
                  overlayX: 'center',
                  originY: 'bottom',
                  overlayY: 'top',
                },
                {
                  originX: 'center',
                  overlayX: 'center',
                  originY: 'top',
                  overlayY: 'bottom',
                },
              ]),
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            hasBackdrop: true,
          });

          const componentPortal = new ComponentPortal(
            DatepickerCalendarComponent,
            this._viewContainerRef,
            this._injector
          );

          oref
            .backdropClick()
            .pipe(takeUntil(oref.detachments()))
            .subscribe(() => {
              this.close();
            });

          const componentRef = oref.attach(componentPortal);

          componentRef.instance.mode = DatepickerMode.RANGE;

          if (value) componentRef.instance.setValue(value);

          componentRef.instance.value$
            .pipe(
              skip(1),
              map((range) => <RangepickerValue>range),
              takeUntil(oref.detachments())
            )
            .subscribe((range) => {
              this.setValue(range);
              this.close();
            });

          this.setOverlayRef(oref);
        });
      })
    )
  );
}
