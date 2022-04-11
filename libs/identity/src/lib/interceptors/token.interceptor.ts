import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TOKEN_REQUIRED_URLS } from '../constants/token-required-urls.token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly _oauthService: OAuthService,
    @Optional()
    @Inject(TOKEN_REQUIRED_URLS)
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
    if (
      !this._isTokenRequiredForThisUri(req.url) ||
      !this._oauthService.hasValidAccessToken()
    ) {
      return next.handle(req);
    }

    return next
      .handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${this._oauthService.getAccessToken()}`,
          },
        })
      )
      .pipe(
        tap((response) => {
          if (
            response instanceof HttpErrorResponse &&
            [401].includes(response.status)
          ) {
            this._ngZone.run(() => {
              this._oauthService.initLoginFlow();
            });
          }
        })
      );
  }
}
