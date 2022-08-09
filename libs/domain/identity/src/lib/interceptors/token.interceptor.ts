import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap } from 'rxjs';

import { TOKEN_REQUIRED_ENDPOINTS } from '../constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly _oidcSecurityService: OidcSecurityService,
    @Optional()
    @Inject(TOKEN_REQUIRED_ENDPOINTS)
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

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !this._isTokenRequiredForThisUri(req.url) ||
      !this._oidcSecurityService.isAuthenticated()
    ) {
      return next.handle(req);
    }

    return this._oidcSecurityService.getAccessToken().pipe(switchMap((token) =>  next.handle(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    )));
  }
}
