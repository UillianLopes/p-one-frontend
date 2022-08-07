import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ToastService } from './toast.service';

@Injectable()
export class ToastInterceptor implements HttpInterceptor {
  constructor(private readonly _toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter((event) => event instanceof HttpResponse),
      tap((event) => {
        if (event instanceof HttpErrorResponse) {
          const { message, messages } = event.error;
          if (message) {
            this._toastService.open(messages, { color: 'danger' });
          }

          if (messages) {
            this._toastService.open(messages, { color: 'danger' });
          }
        } else if (event instanceof HttpResponse) {
          console.log('RESPONSE -> ', event);
        }
      })
    );
  }
}
