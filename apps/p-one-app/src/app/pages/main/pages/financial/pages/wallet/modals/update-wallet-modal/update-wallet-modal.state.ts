import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BankModel, BankService, EWalletType, WalletModel, WalletService } from '@p-one/core';
import { DialogService } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface UpdateWalletModalState {
  isLoading?: boolean;
  type?: EWalletType;
  dialogId?: string;
  banks?: BankModel[];
}

@Injectable()
export class UpdateWalletModalStore extends ComponentStore<UpdateWalletModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly type$ = this.select(({ type }) => type);
  public readonly banks$ = this.select(({ banks }) => banks);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);

  constructor(
    private readonly _bankService: BankService,
    private readonly _walletService: WalletService,
    private readonly _dialogService: DialogService
  ) {
    super({});
  }

  public readonly setType = this.updater((state, type: EWalletType) => {
    return {
      ...state,
      type,
    };
  });

  public readonly setDialogId = this.updater((state, dialogId: string) => {
    return {
      ...state,
      dialogId,
    };
  });

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  public readonly updateWallet = this.effect(
    (data$: Observable<WalletModel>) => {
      return data$.pipe(
        tap(() => this.setIsLoading(true)),
        switchMap((wallet) =>
          this._walletService
            .update(wallet.id, { ...wallet, bankId: wallet.bank?.id })
            .pipe(
              tap({
                next: () => {
                  this.updateWalletSuccess();
                  this.closeDialog();
                },
                error: (error) => this.updateWalletFailure(error),
              })
            )
        )
      );
    }
  );

  public readonly updateWalletSuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly updateWalletFailure = this.updater((state, error: any) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  });

  public readonly closeDialog = this.effect((data$) => {
    return data$.pipe(
      withLatestFrom(this.dialogId$),
      tap(([_, dialogId]) => this._dialogService.close(dialogId, true))
    );
  });

  public readonly loadBanks = this.effect((data$) =>
    data$.pipe(
      switchMap(() =>
        this._bankService.getAll().pipe(
          tap({
            next: (banks) => this.loadBanksSuccess(banks),
            error: (error) => this.loadBanksFailure(error),
          })
        )
      )
    )
  );

  public readonly loadBanksSuccess = this.updater(
    (state, banks: BankModel[]) => {
      return {
        ...state,
        banks,
        isLoading: false,
      };
    }
  );

  public readonly loadBanksFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });
}
