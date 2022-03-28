import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EntryModel, EntryService, PayEntryRequest, WalletModel, WalletService } from '@p-one/financial';
import { DialogService } from '@p-one/shared';
import { Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface PayEntryModalState {
  isLoading: boolean;
  entry: EntryModel;
  dialogId?: string;
  balances: WalletModel[];
  error?: any;
  balance?: WalletModel;
}

@Injectable()
export class PayEntryModalStore extends ComponentStore<PayEntryModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly balances$ = this.select(({ balances }) => balances);
  public readonly entry$ = this.select(({ entry }) => entry);
  public readonly value$ = this.select(this.entry$, ({ value }) => value);
  public readonly dueDate$ = this.select(this.entry$, ({ dueDate }) => dueDate);
  public readonly type$ = this.select(this.entry$, ({ type }) => type);
  public readonly balance$ = this.select(({ balance }) => balance);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);

  constructor(
    private readonly _walletService: WalletService,
    private readonly _entryService: EntryService,
    private readonly _dialogServide: DialogService
  ) {
    super({
      isLoading: false,
      balances: [],
      entry: null,
    });
  }

  public readonly setDialogId = this.updater((state, dialogId: string) => {
    return {
      ...state,
      dialogId,
    };
  });
  public readonly setEntry = this.updater((state, entry: EntryModel) => {
    return {
      ...state,
      entry,
    };
  });

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  public readonly setBalance = this.updater((state, balance: WalletModel) => {
    return {
      ...state,
      balance,
    };
  });

  public readonly loadBalancesSuccess = this.updater(
    (state, balances: WalletModel[]) => {
      return {
        ...state,
        balances,
        isLoading: false,
      };
    }
  );

  public readonly loadBalancesFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });

  public readonly loadBalances = this.effect((data$) => {
    return data$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap(() => this._walletService.get()),
      tap({
        next: (balances) => this.loadBalancesSuccess(balances),
        error: (error) => this.loadBalancesFailure(error),
      })
    );
  });

  public readonly payEntrySuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly payEntryFailure = this.updater((state, error: any) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  });

  public readonly payEntry = this.effect(
    (data$: Observable<PayEntryRequest>) => {
      return data$.pipe(
        tap(() => this.setIsLoading(true)),
        withLatestFrom(this.entry$, this.balance$),
        switchMap(([data, { id: entryId }, { id: balanceId }]) =>
          this._entryService.payEntry(entryId, { ...data, balanceId })
        ),
        withLatestFrom(this.dialogId$),
        tap({
          next: ([__, dialogId]) => {
            this.payEntrySuccess();
            this._dialogServide.close(dialogId, true);
          },
          error: (error) => this.payEntryFailure(error),
        })
      );
    }
  );
}
