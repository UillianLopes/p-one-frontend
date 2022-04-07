import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { UserStoreFacade } from '../stores';

@Injectable()
export class WithoutAuthGuard implements CanActivate {
  constructor(
    private readonly _userStoreService: UserStoreFacade,
    private readonly _router: Router
  ) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userStoreService.isAuthenticated$.pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return this._router.createUrlTree(['/main']);
        }

        return true;
      })
    );
  }
}
