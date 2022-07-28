import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@p-one/domain/admin';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { EUsersStoreActions, loadUsersFailure, loadUsersSuccess, UserrStoreActionsUnion } from './users-store.actions';
import { UsersStoreFacade } from './users-store.facade';

@Injectable()
export class UsersStoreEffects {
  public readonly loadUsersEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUsersStoreActions.LOAD_USERS),
      withLatestFrom(this._facade.query$),
      map(([{ query }, currentQuery]) => ({ ...currentQuery, ...query })),
      switchMap((query) =>
        this._userService.getAll(query).pipe(
          map(({ data, ammount }) =>
            loadUsersSuccess({ users: data, ammount, query })
          ),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<UserrStoreActionsUnion>,
    private readonly _facade: UsersStoreFacade,
    private readonly _userService: UserService
  ) {}
}
