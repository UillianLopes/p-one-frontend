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
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { WithdrawModelForm } from './withdraw-modal.form';

export interface WithdrawModalState {
  dialogId?: string;
  isLoading: boolean;
  error?: ErrorModel;

  categories: OptionModel[];
  subCategories: OptionModel[];
  wallets: WalletOptionModel[];

  wallet?: WalletOptionModel;
}

@Injectable()
export class WithdrawModalStore extends ComponentStore<WithdrawModalState> {
  public readonly wallet$ = this.select(({ wallet }) => wallet);
  public readonly walletExtra$ = this.select(
    this.wallet$,
    (wallet) => wallet?.extra
  );

  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly categories$ = this.select(({ categories }) => categories);
  public readonly subCategories$ = this.select(
    ({ subCategories }) => subCategories
  );
  public readonly wallets$ = this.select(({ wallets }) => wallets);

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

  public readonly loadCategories = this.effect((event$: Observable<void>) => {
    return event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this._categoryService.getAllAsOptions(EEntryOperation.Debit)
      ),
      tap({
        next: (categories) => this.patchState({ categories, isLoading: false }),
        error: (error) => this.patchState({ error, isLoading: false }),
      })
    );
  });

  public readonly loadSubCategories = this.effect(
    (event$: Observable<string>) => {
      return event$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        switchMap((id) =>
          this._subCategoryService.getAllAsOptions(id).pipe(
            tap({
              next: (subCategories) =>
                this.patchState({ isLoading: false, subCategories }),
              error: (error) => this.patchState({ isLoading: false, error }),
            })
          )
        )
      );
    }
  );

  public readonly loadWallets = this.effect(
    (event$: Observable<{ currency?: string }>) => {
      return event$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        withLatestFrom(this._settingsFacadeStore.settingsCurrency$),
        switchMap(([{ currency }, settingsCurrency]) =>
          this._walletService
            .getAllAsOptions({ currency: currency || settingsCurrency })
            .pipe(
              tap((wallets) => this.patchState({ wallets, isLoading: false }))
            )
        )
      );
    }
  );

  public readonly confirmWithdrawSuccess = this.effect((event$) => {
    return event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      withLatestFrom(this.dialogId$),
      tap(([, dialogId]) => this._dialogService.close(dialogId, true))
    );
  });

  public readonly confirmWithdraw = this.effect(
    (event$: Observable<WithdrawModelForm>) => {
      return event$.pipe(
        tap(() => this.patchState({ isLoading: true })),
        switchMap(({ category, subCategory, wallet, ...withdraw }) => {
          if (!wallet || !category) {
            return EMPTY;
          }

          return this._walletService
            .withdraw(wallet.id, {
              ...withdraw,
              categoryId: category?.id,
              subCategoryId: subCategory?.id,
            })
            .pipe(
              tap({
                next: () => this.confirmWithdrawSuccess(),
                error: (error) => this.patchState({ error, isLoading: false }),
              })
            );
        })
      );
    }
  );
}
