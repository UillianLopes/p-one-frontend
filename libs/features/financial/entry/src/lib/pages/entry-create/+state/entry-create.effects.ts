import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService, EntryService, SubCategoryService } from '@p-one/domain/financial';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  buildInstallmentsFailure,
  buildInstallmentsSuccess,
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
      switchMap(({ targetOperation }) => {
        return this._categoryService.get(targetOperation).pipe(
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

  public readonly buildInstallmentsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.BUILD_INSTALLMENTS),
      withLatestFrom(
        this._facade.generalInfoForm$,
        this._facade.installmentsForm$
      ),
      switchMap(([, { value }, installmentsForm]) => {
        return this._entryService
          .buildInstallments({
            value,
            ...installmentsForm,
          })
          .pipe(
            map((installments) => buildInstallmentsSuccess({ installments })),
            catchError((error) => of(buildInstallmentsFailure({ error })))
          );
      })
    )
  );

  public readonly createEntryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.CREATE_ENTRY),
      withLatestFrom(this._facade.generalInfoForm$),
      switchMap(([, { category, subCategory, ...generalInfoForm }]) => {
        return this._entryService
          .create({
            ...generalInfoForm,
            subCategoryId: subCategory?.id,
            categoryId: category?.id,
          })
          .pipe(
            map(() => createEntrySuccess()),
            catchError((error) => of(createEntryFailure({ error })))
          );
      })
    )
  );

  public readonly createInstallmentEntriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.CREATE_INSTALLMENT_ENTRIES),
      withLatestFrom(this._facade.generalInfoForm$, this._facade.installments$),
      switchMap(
        ([, { category, subCategory, ...generalInfoForm }, installments]) => {
          return this._entryService
            .createInstallmentEntries({
              ...generalInfoForm,
              installments,
              subCategoryId: subCategory?.id,
              categoryId: category?.id,
            })
            .pipe(
              map(() => createEntrySuccess()),
              catchError((error) => of(createEntryFailure({ error })))
            );
        }
      )
    )
  );

  public readonly createRecurrentEntryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(EEntryCreateActions.CREATE_RECURRENT_ENTRY),
      withLatestFrom(
        this._facade.generalInfoForm$,
        this._facade.recurrenceForm$
      ),
      switchMap(
        ([, { category, subCategory, ...generalInfoForm }, recurrenceForm]) => {
          return this._entryService
            .createRecurrentEntry({
              ...generalInfoForm,
              ...recurrenceForm,
              subCategoryId: subCategory?.id,
              categoryId: category?.id,
              dueDate: undefined,
            })
            .pipe(
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
          this._router.navigate(['/main/financial/entries']);
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
    private readonly _router: Router
  ) {}
}
