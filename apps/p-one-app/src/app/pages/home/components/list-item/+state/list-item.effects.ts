import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ItemService } from '../item-service.service';
import { EListItemActions, ListItemActionsUnion, loadItemFailure, loadItemSuccess } from './list-item.actions';

@Injectable()
export class ListItemEffects {
  public readonly loadItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EListItemActions.LOAD_ITEM),
      switchMap(({ id }) => {
        return this._itemService.get(id).pipe(
          map((item) => loadItemSuccess({ item })),
          catchError((error) => of(loadItemFailure(error)))
        );
      })
    )
  );
  constructor(
    private actions$: Actions<ListItemActionsUnion>,
    private readonly _itemService: ItemService
  ) {}
}
