import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '@p-one/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  EEntryListActions,
  EntryListActionsUnion,
  loadCategoriesFailure,
  loadCategoriesSuccess,
} from './category-list.actions';
import { CategoryListFacade } from './category-list.facade';

@Injectable()
export class CategoryListEffects {
  readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryListActions.LOAD_CATEGORIES),
      switchMap((_) => {
        return this._categoryService.get().pipe(
          map((categories) => {
            return loadCategoriesSuccess({
              categories,
            });
          }),
          catchError((error) => of(loadCategoriesFailure({ error })))
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _categoryService: CategoryService,
    private readonly _facade: CategoryListFacade
  ) {}
}
