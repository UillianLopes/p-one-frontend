import { Component, Input } from '@angular/core';
import { WalletModel } from '@p-one/domain/financial';

import { WalletCardStore } from './wallet-card.state';

@Component({
  selector: 'p-one-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
  providers: [WalletCardStore],
})
export class WalletCardComponent {
  @Input() public set wallet(wallet: WalletModel) {
    this._walletCardStore.setState({ wallet });
  }

  public readonly currency$ = this._walletCardStore.currency$;
  public readonly wallet$ = this._walletCardStore.wallet$;
  public readonly name$ = this._walletCardStore.name$;
  public readonly value$ = this._walletCardStore.value$;
  public readonly backgroundColor$ = this._walletCardStore.backgroundColor$;
  public readonly color$ = this._walletCardStore.color$;

  constructor(private readonly _walletCardStore: WalletCardStore) {}
}
