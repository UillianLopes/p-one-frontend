import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService, EEntryRecurrence, EntryService, SubCategoryService } from '@p-one/financial';
import { ToastService } from '@p-one/shared';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  buildRecurrencesFailure,
  buildRecurrencesSuccess,
  createEntryFailure,
  createEntrySuccess,
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
      switchMap(({ targetType }) => {
        return this._categoryService.get(targetType).pipe(
          map((categories) => loadCategoriesSuccess({ categories })),
          catchError((error) => of(loadCategoriesFailure({ error })))
        );
      })
    )
  );

  public readonly loadSubCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.LOAD_SUB_CATEGORIES),
      switchMap(({ categoryId }) => {
        return this._subCategoryService.get(categoryId).pipe(
          map((subCategories) => loadSubCategoriesSuccess({ subCategories })),
          catchError((error) => of(loadSubCategoriesFailure({ error })))
        );
      })
    )
  );

  public readonly buildRecurrencesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.BUILD_RECURRENCES),
      withLatestFrom(this._facade.secondStepForm$),
      switchMap(([_, form]) => {
        return this._entryService.buildEntryRecurrence(form).pipe(
          map((recurrences) => buildRecurrencesSuccess({ recurrences })),
          catchError((error) => of(buildRecurrencesFailure({ error })))
        );
      })
    )
  );

  public readonly createEntryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.CREATE_ENTRY),
      withLatestFrom(
        this._facade.firstStepForm$,
        this._facade.secondStepForm$,
        this._facade.recurrences$
      ),
      switchMap(
        ([
          _,
          { category, subCategory, ...firstStepForm },
          { value, recurrence, dueDate, barCode },
          recurrences,
        ]) => {
          let entryCreateRequest: any = {
            ...firstStepForm,
            barCode,
            subCategoryId: subCategory?.id,
            categoryId: category.id,
            recurrences: [...recurrences],
          };

          if (recurrence == EEntryRecurrence.OneTime) {
            entryCreateRequest = {
              ...entryCreateRequest,
              value,
              dueDate,
            };
          }

          return this._entryService.create(entryCreateRequest).pipe(
            map(() => createEntrySuccess()),
            catchError((error) => of(createEntryFailure({ error })))
          );
        }
      )
    )
  );

  public readonly createEntrySuccessEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(EEntryCreateActions.CREATE_ENTRY_SUCCESS),
        tap(() => {
          this._toastService.open(`Entry created with success`);
          this._router.navigate(['/main/entries']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly _actions$: Actions<EntryCreateActionsUnion>,
    private readonly _entryService: EntryService,
    private readonly _categoryService: CategoryService,
    private readonly _subCategoryService: SubCategoryService,
    private readonly _facade: EntryCreateFacade,
    private readonly _router: Router,
    private readonly _toastService: ToastService
  ) {}
}
