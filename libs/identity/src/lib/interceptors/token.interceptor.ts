import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TOKEN_REQUIRED_ENDPOINTS } from '../constants/token-required-urls.token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly _oidcSecurityService: OidcSecurityService,
    @Optional()
    @Inject(TOKEN_REQUIRED_ENDPOINTS)
    private readonly _tokenRequiredUrls: string[],
    private readonly _ngZone: NgZone
  ) {}

  private _isTokenRequiredForThisUri(uri: string) {
    return (
      this._tokenRequiredUrls &&
      this._tokenRequiredUrls.some((requiredTokenUri) =>
        uri.startsWith(requiredTokenUri)
      )
    );
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this._isTokenRequiredForThisUri(req.url)) {
      return next.handle(req);
    }

    return next
      .handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${this._oidcSecurityService.getAccessToken()}`,
          },
        })
      )
      .pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            [401].includes(error.status)
          ) {
            this._ngZone.run(() => {
              this._oidcSecurityService.authorize();
            });
          }
          return throwError(error);
        })
      );
  }
}
