import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService, EntryService, SubCategoryService } from '@p-one/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import {
  buildRecurrencesFailure,
  buildRecurrencesSuccess,
  EEntryCreateActions,
  EntryCreateActionsUnion,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  loadSubCategoriesFailure,
  loadSubCategoriesSuccess,
} from './entry-create.actions';
import { EntryCreateFacade } from './entry-create.facade';

@Injectable()
export class EntryCreateEffects {
  public readonly loadCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.LOAD_CATEGORIES),
      switchMap((_) => {
        return this._categoryService.get().pipe(
          map((categories) => {
            return loadCategoriesSuccess({ categories });
          }),
          catchError((error) => {
            return of(loadCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  public readonly loadSubCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.LOAD_SUB_CATEGORIES),
      switchMap((_) => {
        return this._subCategoryService.get().pipe(
          map((subCategories) => {
            return loadSubCategoriesSuccess({ subCategories });
          }),
          catchError((error) => {
            return of(loadSubCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  public readonly buildRecurrences$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.BUILD_RECURRENCES),
      withLatestFrom(this._facade.secondStepForm$),
      switchMap(([_, form]) => {
        return this._entryService.buildEntryRecurrence(form).pipe(
          map((recurrences) => {
            return buildRecurrencesSuccess({ recurrences });
          }),
          catchError((error) => {
            return of(buildRecurrencesFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions<EntryCreateActionsUnion>,
    private readonly _entryService: EntryService,
    private readonly _categoryService: CategoryService,
    private readonly _subCategoryService: SubCategoryService,
    private readonly _facade: EntryCreateFacade
  ) {}
}
