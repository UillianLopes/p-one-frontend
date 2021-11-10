import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

export const TOAST_REF = new InjectionToken<ToastRef>('TOAST_REF');
export class ToastRef {
  readonly closing$ = new Subject<boolean>();
  readonly closed$ = this.closing$.pipe(
    filter((closing) => closing),
    delay(200)
  );
  
  constructor() {}

  close(): void {
    this.closing$.next(true);
  }
}
