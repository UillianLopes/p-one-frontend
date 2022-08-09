import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _oidcSecurityService: OidcSecurityService,
    private readonly _router: Router
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this._oidcSecurityService.isAuthenticated()) {
      return this._router.createUrlTree(['/landing']);
    }

    return true;
  }
}
