import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import {
  CategoryService,
  EEntryOperation,
  ErrorModel,
  SubCategoryService,
  WalletOptionModel,
  WalletService,
} from '@p-one/domain/financial';
import { DialogService } from '@p-one/shared';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface DepositModalState {
  dialogId?: string;
  isLoading: boolean;
  error?: ErrorModel;

  categories: OptionModel[];
  subCategories: OptionModel[];
  wallets: WalletOptionModel[];
  wallet?: WalletOptionModel;
}

@Injectable()
export class DepositModalStore extends ComponentStore<DepositModalState> {
  public readonly wallet$ = this.select(({ wallet }) => wallet);
  public readonly walletExtra$ = this.select(
    this.wallet$,
    (wallet) => wallet?.extra
  );
  public readonly wallets$ = this.select(({ wallets }) => wallets);

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
    private readonly _subCategoryService: SubCategoryService,
    private readonly _settingsFacadeStore: SettingsStoreFacade
  ) {
    super({
      isLoading: false,
      categories: [],
      subCategories: [],
      wallets: [],
    });
  }

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
  public readonly setWallet = this.updater(
    (state, wallet: WalletOptionModel) => {
      return {
        ...state,
        wallet,
      };
    }
  );

  public readonly failure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });

  public readonly loadCategories = this.effect((event$: Observable<void>) => {
    return event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this._categoryService.getAllAsOptions(EEntryOperation.Credit).pipe(
          tap({
            next: (categories) =>
              this.patchState({ categories, isLoading: false }),
            error: (error) => this.failure(error),
          })
        )
      )
    );
  });

  public readonly loadSubCategories = this.effect(
    (event$: Observable<string>) => {
      return event$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        switchMap((id) => {
          if (!id) {
            return EMPTY;
          }

          return this._subCategoryService.getAllAsOptions(id).pipe(
            tap({
              next: (subCategories) =>
                this.patchState({ subCategories, isLoading: false }),
              error: (error) => this.failure(error),
            })
          );
        })
      );
    }
  );

  public readonly loadWallets = this.effect(
    (event$: Observable<{ currency?: string }>) => {
      return event$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        switchMap((options) =>
          this._walletService
            .getAllAsOptions(options)
            .pipe(
              tap((wallets) => this.patchState({ wallets, isLoading: false }))
            )
        )
      );
    }
  );

  public readonly confirmDepositSuccess = this.effect((event$) => {
    return event$.pipe(
      tap(() => this.setIsLoading(false)),
      withLatestFrom(this.dialogId$),
      tap(([, dialogId]) => this._dialogService.close(dialogId, true))
    );
  });

  public readonly confirmDeposit = this.effect((event$: Observable<any>) => {
    return event$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.wallet$),
      switchMap(([{ category, subCategory, wallet, ...deposit }]) =>
        this._walletService
          .deposit(wallet.id, {
            ...deposit,
            categoryId: category?.id,
            subCategoryId: subCategory?.id,
          })
          .pipe(
            tap({
              next: () => this.confirmDepositSuccess(),
              error: (error) => this.failure(error),
            }),
            catchError(() => EMPTY)
          )
      )
    );
  });
}
