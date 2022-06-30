import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  CategoryModel,
  CategoryService,
  EEntryType,
  ErrorModel,
  SubCategoryModel,
  SubCategoryService,
  WalletModel,
  WalletService,
} from '@p-one/domain/financial';
import { DialogService } from '@p-one/shared';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface WithdrawModalState {
  wallet?: WalletModel;
  dialogId?: string;
  isLoading: boolean;
  error?: ErrorModel;

  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
}

@Injectable()
export class WithdrawModalStore extends ComponentStore<WithdrawModalState> {
  public readonly wallet$ = this.select(({ wallet }) => wallet);
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly categories$ = this.select(({ categories }) => categories);
  public readonly subCategories$ = this.select(
    ({ subCategories }) => subCategories
  );

  constructor(
    private readonly _walletService: WalletService,
    private readonly _dialogService: DialogService,
    private readonly _categoryService: CategoryService,
    private readonly _subCategoryService: SubCategoryService
  ) {
    super({
      isLoading: false,
      categories: [],
      subCategories: [],
    });
  }

  public readonly setCategories = this.updater(
    (state, categories: CategoryModel[]) => {
      return {
        ...state,
        categories,
      };
    }
  );

  public readonly setSubCategories = this.updater(
    (state, subCategories: SubCategoryModel[]) => {
      return {
        ...state,
        subCategories,
      };
    }
  );

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  public readonly setDialogId = this.updater((state, dialogId: string) => {
    return {
      ...state,
      dialogId,
    };
  });

  public readonly setWallet = this.updater((state, wallet: WalletModel) => {
    return {
      ...state,
      wallet,
    };
  });

  public readonly failure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });

  public readonly loadCategoriesSuccess = this.updater(
    (state, categories: CategoryModel[]) => {
      return {
        ...state,
        categories,
        isLoading: false,
      };
    }
  );

  public readonly loadCategories = this.effect((event$: Observable<void>) => {
    return event$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap(() => this._categoryService.get(EEntryType.Debit)),
      tap({
        next: (categories) => this.loadCategoriesSuccess(categories),
        error: (error) => this.failure(error),
      })
    );
  });

  public readonly loadSubCategoriesSuccess = this.updater(
    (state, subCategories: SubCategoryModel[]) => {
      return {
        ...state,
        subCategories,
        isLoading: false,
      };
    }
  );

  public readonly loadSubCategories = this.effect(
    (event$: Observable<string>) => {
      return event$.pipe(
        tap(() => this.setIsLoading(true)),
        switchMap((id) => (id ? this._subCategoryService.get(id) : of([]))),
        tap({
          next: (subCategories) => this.loadSubCategoriesSuccess(subCategories),
          error: (error) => this.failure(error),
        })
      );
    }
  );

  public readonly confirmWithdrawSuccess = this.effect((event$) => {
    return event$.pipe(
      tap(() => this.setIsLoading(false)),
      withLatestFrom(this.dialogId$),
      tap(([__, dialogId]) => this._dialogService.close(dialogId, true))
    );
  });

  public readonly confirmWithdraw = this.effect((event$: Observable<any>) => {
    return event$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.wallet$),
      switchMap(([{ category, subCategory, ...withdraw }, { id: walletId }]) =>
        this._walletService
          .withdraw(walletId, {
            ...withdraw,
            categoryId: category?.id,
            subCategoryId: subCategory?.id,
          })
          .pipe(
            tap({
              next: () => this.confirmWithdrawSuccess(),
              error: (error) => this.failure(error),
            }),
            catchError(() => EMPTY)
          )
      )
    );
  });
}
