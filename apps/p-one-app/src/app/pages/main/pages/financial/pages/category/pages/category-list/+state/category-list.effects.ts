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
  ECategoryListActions,
  EntryListActionsUnion,
  loadCategoriesFailure,
  loadCategoriesSuccess,
  selectCategory,
  selectMultipleCategories,
  unselectCategory,
  unselectMultipleCategories,
  updateCategoryFailure,
  updateCategorySuccess,
} from './category-list.actions';
import { CategoryListFacade } from './category-list.facade';

@Injectable()
export class CategoryListEffects {
  readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.LOAD_CATEGORIES),
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

  readonly createCateogry$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.CREATE_CATEGORY),
      switchMap((action) => {
        return this._categoryService.create(action.category).pipe(
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

  readonly createCategorySucess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.CREATE_CATEGORY_SUCCESS),

      map((_) => closeCreateCategoryDialog()),
      tap(() => {
        this._toastService.open('Categoria criada com sucesso', {
          color: 'success',
        });
      })
    )
  );

  readonly updateCateogry$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.UPDATE_CATEGORY),
      switchMap((action) => {
        return this._categoryService
          .update(action.category.id ?? '', action.category)
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

  readonly updateCategorySucess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.UPDATE_CATEGORY_SUCCESS),
      map((_) => closeUpdateCategoryDialog())
    )
  );

  readonly closeCreateCategoryDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.CLOSE_CREATE_CATEGORY_DIALOG),
      withLatestFrom(this._facade.createCategoryDialogRef$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeCreateCategoryDialogSuccess())
    )
  );

  readonly closeUpdateCategoryDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.CLOSE_UPDATE_CATEGORY_DIALOG),
      withLatestFrom(this._facade.updateCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeUpdateCategoryDialogSuccess())
    )
  );

  readonly toggleCategoryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.TOGGLE_CATEGORY),
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
      ofType(ECategoryListActions.TOGGLE_SELECT_MULTIPLE_CATEGORIES),
      withLatestFrom(this._facade.isAllFiltredCategoriesSelected$),
      filter(([_, isAllCategoriesSelectd]) => isAllCategoriesSelectd),
      map(([_, __]) => unselectMultipleCategories({ categoryIds: [] }))
    )
  );

  readonly selectMultipleCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.TOGGLE_SELECT_MULTIPLE_CATEGORIES),
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
      ofType(ECategoryListActions.DELETE_CATEGORY),
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

  readonly deleteCategorySucess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.DELETE_CATEGORY_SUCCESS),
      map((_) => closeDeleteCategoryDialog())
    )
  );

  readonly closeDeleteCategoryDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.CLOSE_DELETE_CATEGORY_DIALOG),
      withLatestFrom(this._facade.deleteCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeUpdateCategoryDialogSuccess())
    )
  );

  readonly deleteSelectedCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.DELETE_SELECTED_CATEGORIES),
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

  readonly deleteSelectedCategoriesSucess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ECategoryListActions.DELETE_SELECTED_CATEGORIES_SUCCESS),
      map((_) => closeDeleteCategoryDialog())
    )
  );

  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _categoryService: CategoryService,
    private readonly _facade: CategoryListFacade,
    private readonly _dialogService: DialogService,
    private readonly _toastService: ToastService
  ) {}
}
