import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  BankModel,
  BankService,
  EWalletType,
  WalletService,
} from '@p-one/domain/financial';
import { DialogService } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface CreateWalletModalState {
  isLoading?: boolean;
  mode: EWalletType;
  dialogId?: string;
  banks?: BankModel[];
}

@Injectable()
export class CreateWalletModalStore extends ComponentStore<CreateWalletModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly mode$ = this.select(({ mode }) => mode);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly banks$ = this.select(({ banks }) => banks);

  constructor(
    private readonly _walletService: WalletService,
    private readonly _bankService: BankService,
    private readonly _dialogService: DialogService
  ) {
    super({
      mode: EWalletType.Wallet,
    });
  }

  public readonly setMode = this.updater((state, mode: EWalletType) => {
    return {
      ...state,
      mode,
    };
  });

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

  public readonly createWalletSuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly createWalletFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });

  public readonly loadBanks = this.effect((data$) => {
    return data$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap(() =>
        this._bankService.getAll().pipe(
          tap({
            next: (banks) => this.loadBanksSuccess(banks),
            error: (error) => this.loadBanksFailure(error),
          })
        )
      )
    );
  });

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

  public readonly createWallet = this.effect((wallet$: Observable<any>) => {
    return wallet$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.dialogId$, this.mode$),
      switchMap(([wallet, dialogId, mode]) =>
        this._walletService
          .create({
            ...wallet,
            bankId: wallet?.bank?.id,
            type: mode,
          })
          .pipe(
            tap({
              next: () => {
                this.createWalletSuccess();
                this._dialogService.close(dialogId, true);
              },
              error: (error) => this.createWalletFailure(error),
            })
          )
      )
    );
  });
}
