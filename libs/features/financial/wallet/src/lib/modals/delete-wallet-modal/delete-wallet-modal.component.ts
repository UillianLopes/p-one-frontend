import { Component, Inject } from '@angular/core';
import { WalletModel } from '@p-one/domain/financial';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';

import { DeleteWalletModalStore } from './delete-wallet-modal.state';

@Component({
  selector: 'p-one-delete-wallet-modal',
  templateUrl: './delete-wallet-modal.component.html',
  styleUrls: ['./delete-wallet-modal.component.scss'],
  providers: [DeleteWalletModalStore],
})
export class DeleteWalletModalComponent {
  public readonly isLoading$ = this._store.isLoading$;
  public readonly willMoreThanOneWalletBeDeleted$ =
    this._store.willMoreThanOneWalletBeDeleted$;
  public readonly willOnlyOneWalletBeDeleted$ =
    this._store.willOnlyOneWalletBeDeleted$;
  public readonly walletNames$ = this._store.walletNames$;
  public readonly walletsLength$ = this._store.walletsLength$;

  constructor(
    private readonly _store: DeleteWalletModalStore,
    private readonly _dialogRef: DialogRef<DeleteWalletModalComponent>,
    @Inject(PONE_DIALOG_DATA) wallets: WalletModel[]
  ) {
    this._store.setDialogId(this._dialogRef.dialogId);
    this._store.setWallets(wallets);
  }

  public deleteBalances(): void {
    this._store.deleteWallets();
  }
}
