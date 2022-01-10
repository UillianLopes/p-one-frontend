import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BalanceModel, BalanceService } from '@p-one/core';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { DialogService } from '../../../../../../../../../../../../libs/shared/src';

interface DeleteBalanceModalState {
  balances: BalanceModel[];
  isLoading: boolean;
  dialogId: string;
}

@Injectable()
export class DeleteBalanceModalStore extends ComponentStore<DeleteBalanceModalState> {
  public readonly balances$ = this.select(({ balances }) => balances);
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly willMoreThanOneBalanceBeDeleted$ = this.select(
    this.balances$,
    (balances) => balances && balances.length > 1
  );

  public readonly willOnlyOneBalanceBeDeleted$ = this.select(
    this.balances$,
    (balances) => balances && balances.length === 1
  );

  public readonly balancesNames$ = this.select(this.balances$, (balances) =>
    balances.map(({ name }) => name)
  );

  constructor(
    private readonly _balanceService: BalanceService,
    private readonly _dialogService: DialogService
  ) {
    super({
      balances: [],
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

  public readonly setBalances = this.updater(
    (state, balances: BalanceModel[]) => {
      return {
        ...state,
        balances,
      };
    }
  );

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  public readonly deleteBalancesSuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly deleteBalancesFailure = this.updater((state, error: any) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  });

  public readonly deleteBalances = this.effect((data$) => {
    return data$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.balances$),
      switchMap(([_, balances]) =>
        this._balanceService.deleteMultiple(balances.map((b) => b.id))
      ),
      withLatestFrom(this.dialogId$),
      tap({
        next: ([_, dialogId]) => {
          this.deleteBalancesSuccess();
          this._dialogService.close(dialogId, true);
        },
        error: (error) => this.deleteBalancesFailure(error),
      })
    );
  });
}
