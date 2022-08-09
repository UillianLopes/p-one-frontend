import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ToastService } from './toast.service';

@Injectable()
export class ToastInterceptor implements HttpInterceptor {
  constructor(private readonly _toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {

        console.log(event);
        if (event instanceof HttpErrorResponse) {
          const { message, messages } = event.error;
          if (message) {
            this._toastService.open(messages, { color: 'danger' });
          }

          if (messages) {
            this._toastService.open(messages, { color: 'danger' });
          }
        } else if (event instanceof HttpResponse) {
          const { message, messages } = event.body;
          if (message) {
            this._toastService.open(messages, { color: 'success' });
          }

          if (messages) {
            this._toastService.open(messages, { color: 'success' });
          }
        }
      })
    );
  }
}
