import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BalanceService, CreateBalanceRequest } from '@p-one/core';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { DialogService } from '../../../../../../../../../../../../libs/shared/src';

export enum ECreateBalanceModalMode {
  balance = 1,
  wallet,
}

export interface CreateBalanceModalState {
  isLoading?: boolean;
  mode: ECreateBalanceModalMode;
  dialogId?: string;
}

@Injectable()
export class CreateBalanceModalStore extends ComponentStore<CreateBalanceModalState> {
  public readonly isLoading$ = this.select((s) => s.isLoading);
  public readonly mode$ = this.select((s) => s.mode);
  public readonly dialogId$ = this.select((s) => s.dialogId);

  constructor(
    private readonly _balanceService: BalanceService,
    private readonly _dialogService: DialogService
  ) {
    super({
      mode: ECreateBalanceModalMode.balance,
    });
  }

  public readonly setMode = this.updater(
    (state, mode: ECreateBalanceModalMode) => {
      return {
        ...state,
        mode,
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

  public readonly createBalance = this.effect(
    (balance$: Observable<CreateBalanceRequest>) => {
      return balance$.pipe(
        tap(() => this.setIsLoading(true)),
        withLatestFrom(this.dialogId$),
        switchMap(([balance, dialogId]) =>
          this._balanceService.create(balance).pipe(
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
    }
  );
}
