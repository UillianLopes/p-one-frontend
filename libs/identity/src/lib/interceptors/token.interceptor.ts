import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { TOKEN_REQUIRED_URLS } from '../constants/token-required-urls.token';
import { UserStoreFacade } from '../stores';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly _userStoreFacade: UserStoreFacade,
    @Optional()
    @Inject(TOKEN_REQUIRED_URLS)
    private readonly _tokenRequiredUrls: string[]
  ) {}

  private _isTokenRequiredForThisUri(uri: string) {
    return (
      this._tokenRequiredUrls &&
      this._tokenRequiredUrls.some((requiredTokenUri) =>
        uri.startsWith(requiredTokenUri)
      )
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
