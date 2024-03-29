import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import {
  CategoryService,
  EEntryOperation,
  TransferRequest,
  WalletModel,
  WalletOptionModel,
  WalletService,
} from '@p-one/domain/financial';
import { DialogRef } from '@p-one/shared';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface FoundTransferModalState {
  isLoading?: boolean;
  origin: WalletOptionModel | null;
  destination: WalletOptionModel | null;
  wallets: WalletOptionModel[];
  debitCategories: OptionModel[];
  creditCategories: OptionModel[];
  error?: unknown;
  data: WalletModel | null;
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

  public readonly data$ = this.select(({ data }) => data);
  public readonly hasData$ = this.select(this.data$, (data) => !!data);

  public readonly currency$ = this.select(
    this.origin$,
    (origin) => origin?.extra?.currency
  );

  public readonly debitCategories$ = this.select(
    ({ debitCategories }) => debitCategories
  );

  public readonly creditCategories$ = this.select(
    ({ creditCategories }) => creditCategories
  );

  public readonly destinations$ = this.select(
    this.wallets$,
    this.origin$,
    (wallets, origin) =>
      wallets.filter(
        ({ id, extra }) =>
          origin && origin.id !== id && origin.extra.currency === extra.currency
      )
  );

  public readonly origins$ = this.wallets$;

  public readonly wallet$ = this.select((origin) => origin);

  constructor(
    private readonly _dialogRef: DialogRef<unknown>,
    private readonly _categoryService: CategoryService,
    private readonly _walletService: WalletService
  ) {
    super({
      wallets: [],
      debitCategories: [],
      creditCategories: [],
      origin: null,
      destination: null,
      data: null
    });
  }

  public readonly load = this.effect((event$) =>
    event$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap(() =>
        forkJoin([
          this._walletService.getAllAsOptions(),
          this._categoryService.getAllAsOptions(EEntryOperation.Credit),
          this._categoryService.getAllAsOptions(EEntryOperation.Debit),
        ]).pipe(
          tap(([wallets, creditCategories, debitCategories]) =>
            this.patchState({
              wallets,
              creditCategories,
              debitCategories,
              isLoading: false,
            })
          )
        )
      )
    )
  );

  public readonly transfer = this.effect((data$: Observable<TransferRequest>) =>
    data$.pipe(
      tap(() => this.patchState({ isLoading: true })),
      switchMap((request) =>
        this._walletService.transfer(request).pipe(
          tap({
            next: () => {
              this.patchState({ isLoading: false });
              this._dialogRef.close(true);
            },
            error: (error) => this.patchState({ error, isLoading: false }),
          })
        )
      )
    )
  );

  public readonly setOrigin = this.updater(
    (state, origin: WalletOptionModel | null) => ({
      ...state,
      origin,
    })
  );

  public readonly setDestination = this.updater(
    (state, destination: WalletOptionModel | null) => ({
      ...state,
      destination,
    })
  );

  public readonly setData = this.updater((state, data: WalletModel | null) => ({
    ...state,
    data,
  }));

  public readonly setWallets = this.updater(
    (state, wallets: WalletOptionModel[]) => ({ ...state, wallets })
  );
}
