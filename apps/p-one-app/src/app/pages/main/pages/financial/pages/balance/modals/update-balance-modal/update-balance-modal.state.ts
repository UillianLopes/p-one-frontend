import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BalanceModel, BalanceService, BankModel, BankService, EBalanceType } from '@p-one/core';
import { DialogService } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface UpdateBalanceModalState {
  isLoading?: boolean;
  type?: EBalanceType;
  dialogId?: string;
  banks?: BankModel[];
}

@Injectable()
export class UpdateBalanceModalStore extends ComponentStore<UpdateBalanceModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly type$ = this.select(({ type }) => type);
  public readonly banks$ = this.select(({ banks }) => banks);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);

  constructor(
    private readonly _bankService: BankService,
    private readonly _balanceService: BalanceService,
    private readonly _dialogService: DialogService
  ) {
    super({});
  }

  public readonly setType = this.updater((state, type: EBalanceType) => {
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

  public readonly updateBalance = this.effect(
    (data$: Observable<BalanceModel>) => {
      return data$.pipe(
        tap(() => this.setIsLoading(true)),
        switchMap((balance) =>
          this._balanceService
            .update(balance.id, { ...balance, bankId: balance.bank?.id })
            .pipe(
              tap({
                next: () => {
                  this.updateBalanceSuccess();
                  this.closeDialog();
                },
                error: (error) => this.updateBalanceFailure(error),
              })
            )
        )
      );
    }
  );

  public readonly updateBalanceSuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly updateBalanceFailure = this.updater((state, error: any) => {
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
