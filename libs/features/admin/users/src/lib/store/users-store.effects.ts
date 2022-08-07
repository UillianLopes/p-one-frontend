import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@p-one/domain/admin';
import { DialogService } from '@p-one/shared';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { CreateUserModalComponent } from '../modals/create-user-modal/create-user-modal.component';
import {
  EUsersStoreActions,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  UserrStoreActionsUnion,
} from './users-store.actions';
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

  public readonly openCreateUserDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EUsersStoreActions.OPEN_CREATE_USER_DIALOG),
      switchMap(() =>
        this._dialogService
          .open(CreateUserModalComponent, {
            maxWidth: '800px',
            minWidth: '800px',
          })
          .afterClosed$.pipe(
            filter((reload) => reload),
            map(() => loadUsers({ query: {} }))
          )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions<UserrStoreActionsUnion>,
    private readonly _facade: UsersStoreFacade,
    private readonly _userService: UserService,
    private readonly _dialogService: DialogService
  ) {}
}
