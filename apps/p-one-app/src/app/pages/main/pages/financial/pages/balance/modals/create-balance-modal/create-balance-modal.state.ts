import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BalanceService, BankModel, BankService, EBalanceType } from '@p-one/core';
import { DialogService } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface CreateBalanceModalState {
  isLoading?: boolean;
  mode: EBalanceType;
  dialogId?: string;
  banks?: BankModel[];
}

@Injectable()
export class CreateBalanceModalStore extends ComponentStore<CreateBalanceModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly mode$ = this.select(({ mode }) => mode);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly banks$ = this.select(({ banks }) => banks);

  constructor(
    private readonly _balanceService: BalanceService,
    private readonly _bankService: BankService,
    private readonly _dialogService: DialogService
  ) {
    super({
      mode: EBalanceType.balance,
    });
  }

  public readonly setMode = this.updater((state, mode: EBalanceType) => {
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

  public readonly createBalanceSuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly createBalanceFailure = this.updater((state, error: any) => {
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

  public readonly createBalance = this.effect((balance$: Observable<any>) => {
    return balance$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.dialogId$, this.mode$),
      switchMap(([balance, dialogId, mode]) =>
        this._balanceService
          .create({
            ...balance,
            bankId: balance?.bank?.id,
            type: mode,
          })
          .pipe(
            tap({
              next: () => {
                this.createBalanceSuccess();
                this._dialogService.close(dialogId, true);
              },
              error: (error) => this.createBalanceFailure(error),
            })
          )
      )
    );
  });
}
