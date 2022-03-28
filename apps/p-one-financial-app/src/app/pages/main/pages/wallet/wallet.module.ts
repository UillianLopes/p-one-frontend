import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneBreadcrumbModule,
  POneColorPickerModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
  POneTooltipModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { WalletEffects } from './+state/wallet.effects';
import { WalletFacade } from './+state/wallet.facade';
import { WALLET_KEY, walletReducer } from './+state/wallet.reducer';
import { CreateWalletModalComponent } from './modals/create-wallet-modal/create-wallet-modal.component';
import { DeleteWalletModalComponent } from './modals/delete-wallet-modal/delete-wallet-modal.component';
import { DepositModalComponent } from './modals/deposit-modal/deposit-modal.component';
import { UpdateWalletModalComponent } from './modals/update-wallet-modal/update-wallet-modal.component';
import { WithdrawModalComponent } from './modals/withdraw-modal/withdraw-modal.component';
import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet.routing';

@NgModule({
  declarations: [
    WalletComponent,
    CreateWalletModalComponent,
    UpdateWalletModalComponent,
    DeleteWalletModalComponent,
    DepositModalComponent,
    WithdrawModalComponent,
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneInputModule,
    POneBreadcrumbModule,
    POneSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    POneContextMenuModule,
    NgbPaginationModule,
    StoreModule.forFeature(WALLET_KEY, walletReducer),
    EffectsModule.forFeature([WalletEffects]),
    POneDialogModule,
    POneGridModule,
    NgxCurrencyModule,
    POneFlexModule,
    POneTooltipModule,
    POneColorPickerModule,
  ],
  providers: [WalletFacade],
})
export class WalletModule {}
