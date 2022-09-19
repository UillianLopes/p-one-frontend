import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POneDialogModule } from '@p-one/shared';

import { WalletEffects } from './wallet-store.effects';
import { WalletFacade } from './wallet-store.facade';
import { WALLET_KEY, walletReducer } from './wallet-store.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(WALLET_KEY, walletReducer),
    EffectsModule.forFeature([WalletEffects]),
    POneDialogModule,
  ],
  providers: [WalletFacade],
})
export class WalletStoreModule {}
