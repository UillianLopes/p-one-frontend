import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubCategoryService } from '@p-one/core';
import { DialogService, ToastService } from '@p-one/shared';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  closeCreateSubCategoryDialog,
  closeCreateSubCategoryDialogSuccess,
  closeDeleteSubCategoryDialog,
  closeUpdateSubCategoryDialog,
  closeUpdateSubCategoryDialogSuccess,
  createSubCategoryFailure,
  createSubCategorySuccess,
  deleteSelectedSubCategoriesFailure,
  deleteSelectedSubCategoriesSuccess,
  deleteSubCategorySuccess,
  EntryListActionsUnion,
  ESubCategoryActions,
  loadSubCategoriesFailure,
  loadSubCategoriesSuccess,
  selectMultipleSubCategories,
  selectSubCategory,
  unselectMultipleSubCategories,
  unselectSubCategory,
  updateSubCategoryFailure,
  updateSubCategorySuccess,
} from './sub-category.actions';
import { SubCategoryFacade } from './sub-category.facade';

@Injectable()
export class SubCategoryEffects {
  readonly loadEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.LOAD_SUB_CATEGORIES),
      switchMap((_) => {
        return this._categoryService.get().pipe(
          map((categories) => {
            return loadSubCategoriesSuccess({
              categories,
            });
          }),
          catchError((error) => of(loadSubCategoriesFailure({ error })))
        );
      })
    )
  );

  readonly createSubCateogryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.CREATE_SUB_CATEGORY),
      switchMap((action) => {
        return this._categoryService.create(action.category).pipe(
          map((category) => {
            return createSubCategorySuccess({
              category,
            });
          }),
          catchError((error) => of(createSubCategoryFailure({ error })))
        );
      })
    )
  );

  readonly createSubCategorySucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.CREATE_SUB_CATEGORY_SUCCESS),

      map((_) => closeCreateSubCategoryDialog()),
      tap(() => {
        this._toastService.open('Categoria criada com sucesso', {
          color: 'success',
        });
      })
    )
  );

  readonly updateSubCateogryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.UPDATE_SUB_CATEGORY),
      switchMap((action) => {
        return this._categoryService
          .update(action.category.id ?? '', action.category)
          .pipe(
            map((category) => {
              return updateSubCategorySuccess({
                category,
              });
            }),
            catchError((error) => of(updateSubCategoryFailure({ error })))
          );
      })
    )
  );

  readonly updateSubCategorySucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.UPDATE_SUB_CATEGORY_SUCCESS),
      map((_) => closeUpdateSubCategoryDialog())
    )
  );

  readonly closeSubCreateCategoryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.CLOSE_CREATE_SUB_CATEGORY_DIALOG),
      withLatestFrom(this._facade.createSubCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeCreateSubCategoryDialogSuccess())
    )
  );

  readonly closeUpdateSubCategoryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.CLOSE_UPDATE_SUB_CATEGORY_DIALOG),
      withLatestFrom(this._facade.updateSubCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeUpdateSubCategoryDialogSuccess())
    )
  );

  readonly toggleSubCategoryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.TOGGLE_SUB_CATEGORY),
      withLatestFrom(this._facade.selectedSubCategoryIds$),
      map(([{ subCategoryId: categoryId }, selectedCategoryIds]) =>
        selectedCategoryIds.includes(categoryId)
          ? unselectSubCategory({ subCategoryId: categoryId })
          : selectSubCategory({ subCategoryId: categoryId })
      )
    )
  );

  readonly unselectMultipleSubCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.TOGGLE_SELECT_MULTIPLE_SUB_CATEGORIES),
      withLatestFrom(this._facade.isAllFiltredSubCategoriesSelected$),
      filter(([_, isAllCategoriesSelectd]) => isAllCategoriesSelectd),
      map(([_, __]) => unselectMultipleSubCategories({ subCategoryIds: [] }))
    )
  );

  readonly selectMultipleSubCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.TOGGLE_SELECT_MULTIPLE_SUB_CATEGORIES),
      withLatestFrom(
        this._facade.isAllFiltredSubCategoriesSelected$,
        this._facade.filtredSubCategoriesIds$
      ),
      filter(
        ([_, isAllFiltredCategoriesSelectd]) => !isAllFiltredCategoriesSelectd
      ),
      map(([_, __, filtredCategoriesIds]) =>
        selectMultipleSubCategories({ subCategoryIds: filtredCategoriesIds })
      )
    )
  );

  readonly deleteSubCategoryEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.DELETE_SUB_CATEGORY),
      switchMap(({ subCategoryId: categoryId }) => {
        return this._categoryService.delete(categoryId).pipe(
          map(() => {
            return deleteSubCategorySuccess({ subCategoryId: categoryId });
          }),
          catchError((error) => {
            return of(deleteSelectedSubCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  readonly deleteSubCategorySucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.DELETE_SUB_CATEGORY_SUCCESS),
      map((_) => closeDeleteSubCategoryDialog())
    )
  );

  readonly closeDeleteSubCategoryDialogEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.CLOSE_DELETE_SUB_CATEGORY_DIALOG),
      withLatestFrom(this._facade.deleteSubCategoryDialogId$),
      filter(([_, dialogId]) => !!dialogId),
      tap(([_, dialogId]) => this._dialogService.close(dialogId)),
      map(() => closeUpdateSubCategoryDialogSuccess())
    )
  );

  readonly deleteSelectedSubCategoriesEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.DELETE_SELECTED_SUB_CATEGORIES),
      withLatestFrom(this._facade.filtredSelectedSubCategoriesIds$),
      switchMap(([_, categoriesIds]) => {
        return this._categoryService.deleteMultiple(categoriesIds).pipe(
          map(() => {
            return deleteSelectedSubCategoriesSuccess({
              subCategoriesIds: categoriesIds,
            });
          }),
          catchError((error) => {
            return of(deleteSelectedSubCategoriesFailure({ error }));
          })
        );
      })
    )
  );

  readonly deleteSelectedCategoriesSucessEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubCategoryActions.DELETE_SELECTED_SUB_CATEGORIES_SUCCESS),
      map((_) => closeDeleteSubCategoryDialog())
    )
  );

  constructor(
    private readonly _actions$: Actions<EntryListActionsUnion>,
    private readonly _categoryService: SubCategoryService,
    private readonly _facade: SubCategoryFacade,
    private readonly _dialogService: DialogService,
    private readonly _toastService: ToastService
  ) {}
}
