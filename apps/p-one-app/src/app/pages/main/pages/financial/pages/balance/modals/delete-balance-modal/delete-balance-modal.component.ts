import { Component, Inject } from '@angular/core';
import { BalanceModel } from '@p-one/core';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';

import { DeleteBalanceModalStore } from './delete-balance-modal.state';

@Component({
  selector: 'p-one-delete-balance-modal',
  templateUrl: './delete-balance-modal.component.html',
  styleUrls: ['./delete-balance-modal.component.scss'],
  providers: [DeleteBalanceModalStore],
})
export class DeleteBalanceModalComponent {
  public readonly isLoading$ = this._store.isLoading$;
  public readonly willMoreThanOneBalanceBeDeleted$ =
    this._store.willMoreThanOneBalanceBeDeleted$;
  public readonly willOnlyOneBalanceBeDeleted$ =
    this._store.willOnlyOneBalanceBeDeleted$;
  public readonly balancesNames$ = this._store.balancesNames$;

  constructor(
    private readonly _store: DeleteBalanceModalStore,
    private readonly _dialogRef: DialogRef,
    @Inject(PONE_DIALOG_DATA) balances: BalanceModel[]
  ) {
    this._store.setDialogId(this._dialogRef.dialogId);
    this._store.setBalances(balances);
  }

  public deleteBalances(): void {
    this._store.deleteBalances();
  }
}
