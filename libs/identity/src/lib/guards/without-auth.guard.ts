import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class WithoutAuthGuard implements CanActivate {
  constructor(
    private readonly _oauthService: OAuthService,
    private readonly _router: Router
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this._oauthService.hasValidAccessToken()) {
      return this._router.createUrlTree(['/main']);
    }

    return true;
  }
}
