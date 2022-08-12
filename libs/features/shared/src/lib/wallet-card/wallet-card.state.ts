import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WalletModel } from '@p-one/domain/financial';
import { SettingsStoreFacade } from '@p-one/stores/identity';
import { getContrastingColor } from 'ngx-color';

export interface WalletCardState {
  wallet?: WalletModel;
}

@Injectable()
export class WalletCardStore extends ComponentStore<WalletCardState> {
  public readonly wallet$ = this.select(({ wallet }) => wallet);
  public readonly name$ = this.select(this.wallet$, (wallet) => wallet?.name);
  public readonly value$ = this.select(this.wallet$, (wallet) => wallet?.value);
  public readonly backgroundColor$ = this.select(
    this.wallet$,
    (wallet) => wallet?.color
  );
  public readonly color$ = this.select(
    this.backgroundColor$,
    (backgroundColor) => backgroundColor ? getContrastingColor(backgroundColor) : 'white'
  );
  
  public readonly currency$ = this.select(
    this.wallet$,
    this._settingsStoreFacade.settingsCurrency$,
    (wallet, settingsCurrency) => wallet?.currency ?? settingsCurrency
  );

  constructor(private readonly _settingsStoreFacade: SettingsStoreFacade) {
    super({});
  }
}
