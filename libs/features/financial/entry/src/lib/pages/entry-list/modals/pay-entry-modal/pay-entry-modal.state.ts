import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EntryModel, EntryService, WalletOptionModel, WalletService } from '@p-one/domain/financial';
import { DialogService } from '@p-one/shared';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { PayEntryForm } from './pay-entry.form';

export interface PayEntryModalState {
  isLoading: boolean;
  entry: EntryModel;
  wallet: WalletOptionModel;
  dialogId?: string;
  wallets: WalletOptionModel[];
  error?: unknown;
}

@Injectable()
export class PayEntryModalStore extends ComponentStore<PayEntryModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly wallets$ = this.select(({ wallets }) => wallets);
  public readonly entry$ = this.select(({ entry }) => entry);
  public readonly value$ = this.select(this.entry$, ({ value }) => value);
  public readonly dueDate$ = this.select(this.entry$, ({ dueDate }) => dueDate);
  public readonly type$ = this.select(this.entry$, ({ type }) => type);
  public readonly wallet$ = this.select(({ wallet }) => wallet);
  public readonly dialogId$ = this.select(({ dialogId }) => dialogId);
  public readonly canDefineEntryValue$ = this.select(
    this.entry$,
    (entry) => !entry?.id
  );

  constructor(
    private readonly _walletService: WalletService,
    private readonly _entryService: EntryService,
    private readonly _dialogServide: DialogService
  ) {
    super({
      isLoading: false,
      wallets: [],
      entry: null,
      wallet: null,
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

  public readonly setWallet = this.updater((state, wallet: WalletOptionModel) => {
    return {
      ...state,
      wallet,
    };
  });

  private readonly _loadWalletsSuccess = this.updater(
    (state, wallets: WalletOptionModel[]) => {
      return {
        ...state,
        wallets,
        isLoading: false,
      };
    }
  );

  private readonly _loadWalletsFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });

  public readonly loadWallets = this.effect((data$) => {
    return data$.pipe(
      tap(() => this.setIsLoading(true)),
      withLatestFrom(this.entry$),
      switchMap(([, { currency }]) =>
        this._walletService.getAllAsOptions({ currency }).pipe(
          tap({
            next: (wallets) => this._loadWalletsSuccess(wallets),
            error: (error) => this._loadWalletsFailure(error),
          })
        )
      )
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

  public readonly payEntry = this.effect((data$: Observable<PayEntryForm>) => {
    return data$.pipe(
      withLatestFrom(this.entry$),
      filter(([, entry]) => !!entry),
      tap(() => this.setIsLoading(true)),
      switchMap(([{ wallet, ...form }, { id: entryId, parentId, dueDate }]) => {
        const id = entryId ?? parentId;

        if (!id) {
          return of(null);
        }

        return this._entryService
          .payEntry(id, {
            ...form,
            walletId: wallet?.id,
            dueDate,
          })
          .pipe(
            withLatestFrom(this.dialogId$),
            tap({
              next: ([__, dialogId]) => {
                this.payEntrySuccess();
                this._dialogServide.close(dialogId, true);
              },
              error: (error) => this.payEntryFailure(error),
            })
          );
      })
    );
  });
}
