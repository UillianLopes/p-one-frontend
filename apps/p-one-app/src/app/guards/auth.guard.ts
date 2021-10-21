import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserStoreService } from '../stores/user-store/user-store.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _userStoreService: UserStoreService) {}

  canActivate(
    _: ActivatedRouteSnapshot,
    __: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userStoreService.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this._userStoreService.signIn();
        }
      })
    );
  }
}
