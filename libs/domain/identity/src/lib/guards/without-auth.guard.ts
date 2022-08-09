import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable, take } from 'rxjs';

@Injectable()
export class WithoutAuthGuard implements CanActivate {
  constructor(
    private readonly _oidcSecurityService: OidcSecurityService,
    private readonly _router: Router
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._oidcSecurityService.isAuthenticated().pipe(take(1)).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return this._router.createUrlTree(['/main']);
        }

        return true;
      })
    );
  }
}
