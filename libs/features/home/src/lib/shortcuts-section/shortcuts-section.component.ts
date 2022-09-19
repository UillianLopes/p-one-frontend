import { Component } from '@angular/core';
import { WalletFacade } from '@p-one/features/financial/wallet';

import { ShortcutStore } from './shortcut/shortcut.state';

@Component({
  selector: 'p-one-shortcuts-section',
  templateUrl: './shortcuts-section.component.html',
  styleUrls: ['./shortcuts-section.component.scss'],
  providers: [ShortcutStore],
})
export class ShortcutsSectionComponent {
  public readonly color$ = this._store.color$;

  constructor(
    private readonly _store: ShortcutStore,
    private readonly _walletFacade: WalletFacade
  ) {}

  public openDepositWalletDialog(): void {
    this._walletFacade.openDepositWalletDialog(null);
  }

  public openWithdrawWalletDialog(): void {
    this._walletFacade.openWithdrawWalletDialog(null)
  }

  public openTransferFoundsDialog() {
    this._walletFacade.openTransferFoundsDialog(null)
  }
}
