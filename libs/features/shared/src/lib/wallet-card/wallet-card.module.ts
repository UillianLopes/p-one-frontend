import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsStoreModule } from '@p-one/stores/identity';

import { WalletCardComponent } from './wallet-card.component';

@NgModule({
  declarations: [WalletCardComponent],
  imports: [CommonModule, SettingsStoreModule],
  exports: [WalletCardComponent],
})
export class WalletCardModule {}
