import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '@p-one/core';
import { DialogService, ToastService } from '@p-one/shared';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  closeCreateCategoryDialog,
  closeCreateCategoryDialogSuccess,
  closeDeleteCategoryDialog,
  closeUpdateCategoryDialog,
  closeUpdateCategoryDialogSuccess,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategorySuccess,
  deleteSelectedCategoriesFailure,
  deleteSelectedCategoriesSuccess,
  ECategoryActions,
  EntryListActionsUnion,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  selectCategory,
  selectMultipleCategories,
  unselectCategory,
  unselectMultipleCategories,
  updateCategoryFailure,
  updateCategorySuccess,
} from './category.actions';
import { CategoryFacade } from './category.facade';

@Injectable()
export class CategoryEffects {
  readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.LOAD_CATEGORIES),
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

  readonly createCateogryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.CREATE_CATEGORY),
      switchMap(({ createCategoryRequest }) => {
        return this._categoryService.create(createCategoryRequest).pipe(
          map((category) => {
            return createCategorySuccess({
              category,
            });
          }),
          catchError((error) => of(createCategoryFailure({ error })))
        );
      })
    )
  );

  readonly createCategorySucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.CREATE_CATEGORY_SUCCESS),
      map((_) => closeCreateCategoryDialog()),
      tap(() => {
        this._toastService.open('Categoria criada com sucesso', {
          color: 'success',
        });
      })
    )
  );

  readonly updateCateogryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.UPDATE_CATEGORY),
      switchMap(({ updateCategoryRequest }) => {
        return this._categoryService
          .update(updateCategoryRequest.id ?? '', updateCategoryRequest)
          .pipe(
            map((category) => {
              return updateCategorySuccess({
                category,
              });
            }),
            catchError((error) => of(updateCategoryFailure({ error })))
          );
      })
    )
  );

  readonly updateCategorySucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.UPDATE_CATEGORY_SUCCESS),
      map((_) => closeUpdateCategoryDialog())
    )
  );

  readonly closeCreateCategoryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.CLOSE_CREATE_CATEGORY_DIALOG),
      withLatestFrom(this._facade.createCategoryDialogRef$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeCreateCategoryDialogSuccess())
    )
  );

  readonly closeUpdateCategoryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.CLOSE_UPDATE_CATEGORY_DIALOG),
      withLatestFrom(this._facade.updateCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeUpdateCategoryDialogSuccess())
    )
  );

  readonly toggleCategoryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.TOGGLE_CATEGORY),
      withLatestFrom(this._facade.selectedCategoryIds$),
      map(([{ categoryId }, selectedCategoryIds]) =>
        selectedCategoryIds.includes(categoryId)
          ? unselectCategory({ categoryId })
          : selectCategory({ categoryId })
      )
    )
  );

  readonly unselectMultipleCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.TOGGLE_SELECT_MULTIPLE_CATEGORIES),
      withLatestFrom(this._facade.isAllFiltredCategoriesSelected$),
      filter(([_, isAllCategoriesSelectd]) => isAllCategoriesSelectd),
      map(([_, __]) => unselectMultipleCategories({ categoryIds: [] }))
    )
  );

  readonly selectMultipleCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.TOGGLE_SELECT_MULTIPLE_CATEGORIES),
      withLatestFrom(
        this._facade.isAllFiltredCategoriesSelected$,
        this._facade.filtredCategoriesIds$
      ),
      filter(
        ([_, isAllFiltredCategoriesSelectd]) => !isAllFiltredCategoriesSelectd
      ),
      map(([_, __, filtredCategoriesIds]) =>
        selectMultipleCategories({ categoryIds: filtredCategoriesIds })
      )
    )
  );

  readonly deleteCategoryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.DELETE_CATEGORY),
      switchMap(({ categoryId }) => {
        return this._categoryService.delete(categoryId).pipe(
          map(() => {
            return deleteCategorySuccess({ categoryId });
          }),
          catchError((error) => {
            return of(deleteSelectedCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  readonly deleteCategorySucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.DELETE_CATEGORY_SUCCESS),
      map((_) => closeDeleteCategoryDialog())
    )
  );

  readonly closeDeleteCategoryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.CLOSE_DELETE_CATEGORY_DIALOG),
      withLatestFrom(this._facade.deleteCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeUpdateCategoryDialogSuccess())
    )
  );

  readonly deleteSelectedCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.DELETE_SELECTED_CATEGORIES),
      withLatestFrom(this._facade.filtredSelectedCategoriesIds$),
      switchMap(([_, categoriesIds]) => {
        return this._categoryService.deleteMultiple(categoriesIds).pipe(
          map(() => {
            return deleteSelectedCategoriesSuccess({ categoriesIds });
          }),
          catchError((error) => {
            return of(deleteSelectedCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  readonly deleteSelectedCategoriesSucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryActions.DELETE_SELECTED_CATEGORIES_SUCCESS),
      map((_) => closeDeleteCategoryDialog())
    )
  );

  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _categoryService: CategoryService,
    private readonly _facade: CategoryFacade,
    private readonly _dialogService: DialogService,
    private readonly _toastService: ToastService
  ) {}
}
