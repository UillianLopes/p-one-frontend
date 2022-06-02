import { Inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  CategoryModel,
  CategoryService,
  EEntryType,
  SubCategoryModel,
  SubCategoryService,
  TransferRequest,
  WalletModel,
  WalletService,
} from '@p-one/financial';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface FoundTransferModalState {
  isLoading?: boolean;
  origin?: WalletModel;
  destination?: WalletModel;
  wallets: WalletModel[];
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  error?: any;
  data?: WalletModel;
}

@Injectable()
export class FoundTransferModalStore extends ComponentStore<FoundTransferModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly origin$ = this.select(({ origin }) => origin);
  public readonly destination$ = this.select(({ destination }) => destination);
  public readonly wallets$ = this.select(({ wallets }) => wallets);

  public readonly destinationWallets$ = this.select(
    this.wallets$,
    this.origin$,
    (wallets, origin) => wallets.filter(({ id }) => id !== origin?.id)
  );

  public readonly originWallets$ = this.select(
    this.wallets$,
    this.destination$,
    (wallets, destination) => wallets.filter(({ id }) => id !== destination?.id)
  );

  public readonly categories$ = this.select(({ categories }) => categories);
  public readonly data$ = this.select(({ data }) => data);
  public readonly hasData$ = this.select(this.data$, (data) => !!data);
  public readonly currency$ = this.select(
    this.data$,
    ({ currency }) => currency
  );

  public readonly debitCategories$ = this.select(
    this.categories$,
    (categories) => categories.filter(({ type }) => type === EEntryType.Debit)
  );

  public readonly creditCategories$ = this.select(
    this.categories$,
    (categories) => categories.filter(({ type }) => type === EEntryType.Credit)
  );

  public readonly destinations$ = this.select(
    this.wallets$,
    this.origin$,
    (wallets, origin) => wallets.filter(({ id }) => id !== origin?.id)
  );

  public readonly origins$ = this.select(
    this.wallets$,
    this.destination$,
    (wallets, destination) =>
      wallets.filter((wallet) => wallet.id !== destination?.id)
  );

  public readonly wallet$ = this.select((data) => data);

  constructor(
    private readonly _dialogRef: DialogRef,
    private readonly _categoryService: CategoryService,
    private readonly _subCategoryService: SubCategoryService,
    private readonly _walletService: WalletService
  ) {
    super({
      wallets: [],
      categories: [],
      subCategories: [],
    });
  }

  public readonly load = this.effect((event$) =>
    event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this._walletService.get().pipe(
          switchMap((wallets) =>
            this._categoryService.get().pipe(
              tap({
                next: (categories) =>
                  this.patchState({
                    categories,
                    wallets,
                    isLoading: false,
                  }),
                error: (error) => this.patchState({ error, isLoading: false }),
              })
            )
          )
        )
      )
    )
  );

  public readonly loadCategories = this.effect((event$) => {
    return event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this._categoryService.get().pipe(
          tap({
            next: (categories) =>
              this.patchState({ categories, isLoading: false }),
            error: (error) => this.patchState({ error, isLoading: false }),
          })
        )
      )
    );
  });

  public readonly loadSubCategories = this.effect((event$) => {
    return event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this._subCategoryService.get().pipe(
          tap({
            next: (subCategories) =>
              this.patchState({ subCategories, isLoading: false }),
            error: (error) => this.patchState({ error, isLoading: false }),
          })
        )
      )
    );
  });

  public readonly loadWallets = this.effect((event$) => {
    return event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        this._walletService.get().pipe(
          tap({
            next: (wallets) => this.patchState({ wallets, isLoading: false }),
            error: (error) => this.patchState({ error, isLoading: false }),
          })
        )
      )
    );
  });

  public readonly transfer = this.effect((data$: Observable<TransferRequest>) =>
    data$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((request) =>
        this._walletService.transfer(request).pipe(
          tap({
            next: () => {
              this.patchState({ isLoading: false });
              this._dialogRef.close();
            },
            error: (error) => this.patchState({ error, isLoading: false }),
          })
        )
      )
    )
  );

  public readonly setOrigin = this.updater((state, origin: WalletModel) => ({
    ...state,
    origin,
  }));

  public readonly setDestination = this.updater(
    (state, origin: WalletModel) => ({
      ...state,
      origin,
    })
  );

  public readonly setData = this.updater((state, data: WalletModel) => ({
    ...state,
    data,
  }));

  public readonly setWallets = this.updater(
    (state, wallets: WalletModel[]) => ({ ...state, wallets })
  );
}
