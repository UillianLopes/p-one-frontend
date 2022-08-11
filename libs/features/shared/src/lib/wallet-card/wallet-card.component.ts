import { Component, Input } from '@angular/core';
import { WalletModel } from '@p-one/domain/financial';
import { SettingsStoreFacade } from '@p-one/stores/identity';

@Component({
  selector: 'p-one-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
})
export class WalletCardComponent {
  @Input() public wallet?: WalletModel;

  public readonly settingsCurrency$ = this._settingsStoreFacade.settingsCurrency$;

  constructor(private readonly _settingsStoreFacade: SettingsStoreFacade) {}
}
