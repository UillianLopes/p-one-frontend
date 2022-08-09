import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WalletModel, WalletService } from '@p-one/domain/financial';
import { DialogService } from '@p-one/shared';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

interface DeleteWalletModalState {
  wallets: WalletModel[];
  isLoading: boolean;
  dialogId: string;
}

@Injectable()
export class DeleteWalletModalStore extends ComponentStore<DeleteWalletModalState> {
  public readonly wallets$ = this.select(({ wallets }) => wallets);
  public readonly walletsLength$ = this.select(
    this.wallets$,
    (wallets) => wallets.length
  );

  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly willMoreThanOneWalletBeDeleted$ = this.select(
    this.walletsLength$,
    (walletsLength) => walletsLength > 1
  );

  public readonly willOnlyOneWalletBeDeleted$ = this.select(
    this.walletsLength$,
    (walletsLength) => walletsLength === 1
  );

  public readonly walletNames$ = this.select(this.wallets$, (wallets) =>
    wallets.map(({ name }) => name)
  );

  constructor(
    private readonly _walletService: WalletService,
    private readonly _dialogService: DialogService
  ) {
    super({
      wallets: [],
      isLoading: false,
      dialogId: null,
    });
  }

  public readonly setDialogId = this.updater((state, dialogId: string) => {
    return {
      ...state,
      dialogId,
    };
  });

  public readonly setWallets = this.updater(
    (state, balances: WalletModel[]) => {
      return {
        ...state,
        wallets: balances,
      };
    }
  );

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  public readonly deleteWalletsSuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly deleteWalletsFailure = this.updater((state, error: any) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  });

  public readonly deleteWallets = this.effect((data$) => {
    return data$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.wallets$),
      switchMap(([_, wallets]) =>
        this._walletService.deleteMultiple(wallets.map((b) => b.id)).pipe(
          withLatestFrom(this.dialogId$),
          tap({
            next: ([_, dialogId]) => {
              this.deleteWalletsSuccess();
              this._dialogService.close(dialogId, true);
            },
            error: (error) => this.deleteWalletsFailure(error),
          })
        )
      )
    );
  });
}
