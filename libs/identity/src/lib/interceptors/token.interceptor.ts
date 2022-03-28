import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FINANCIAL_API_URL } from '@p-one/financial';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { UserStoreFacade } from '../stores/user-store/+state/user-store.facade';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly requiredTokenUris = [this._financialApi].filter(
    (url) => !!url
  );

  constructor(
    private readonly _userStoreFacade: UserStoreFacade,
    @Inject(FINANCIAL_API_URL) private readonly _financialApi: string
  ) {}

  private _isTokenRequiredForThisUri(uri: string) {
    return this.requiredTokenUris.some((requiredTokenUri) =>
      uri.startsWith(requiredTokenUri)
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this._isTokenRequiredForThisUri(req.url)) {
      return next.handle(req);
    }

    return combineLatest([
      this._userStoreFacade.isAuthenticated$,
      this._userStoreFacade.accessToken$,
    ]).pipe(
      take(1),
      switchMap(([isAuthenticated, accessToken]) => {
        if (isAuthenticated) {
          return next.handle(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          );
        }

        return next.handle(req);
      }),
      tap((response) => {
        if (
          response instanceof HttpErrorResponse &&
          [401].includes(response.status)
        ) {
          this._userStoreFacade.signIn();
        }
      })
    );
  }
}
