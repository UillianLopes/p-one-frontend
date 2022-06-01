import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
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
  POneStepperModule,
  POneTooltipModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { WalletEffects } from './+state/wallet.effects';
import { WalletFacade } from './+state/wallet.facade';
import { WALLET_KEY, walletReducer } from './+state/wallet.reducer';
import { CreateWalletModalComponent } from './modals/create-wallet-modal/create-wallet-modal.component';
import { DeleteWalletModalComponent } from './modals/delete-wallet-modal/delete-wallet-modal.component';
import { DepositModalComponent } from './modals/deposit-modal/deposit-modal.component';
import { FoundTransferModalComponent } from './modals/found-transfer-modal/found-transfer-modal.component';
import { UpdateWalletModalComponent } from './modals/update-wallet-modal/update-wallet-modal.component';
import { WithdrawModalComponent } from './modals/withdraw-modal/withdraw-modal.component';
import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet.routing';
import { FoundTransferStepComponent } from './modals/found-transfer-modal/found-transfer-step/found-transfer-step.component';

@NgModule({
  declarations: [
    WalletComponent,
    CreateWalletModalComponent,
    UpdateWalletModalComponent,
    DeleteWalletModalComponent,
    DepositModalComponent,
    WithdrawModalComponent,
    FoundTransferModalComponent,
    FoundTransferStepComponent,
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
    POneNotificationsDisplayButtonModule,
    TranslateModule,
    POneStepperModule,
  ],
  providers: [WalletFacade],
})
export class WalletModule {}
