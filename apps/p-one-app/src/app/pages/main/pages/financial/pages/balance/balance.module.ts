import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneBreadcrumbModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { BalanceEffects } from './+state/balance.effects';
import { BalanceFacade } from './+state/balance.facade';
import { BALANCE_KEY, balanceReducer } from './+state/balance.reducer';
import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance.routing';
import { CreateBalanceModalComponent } from './modals/create-balance-modal/create-balance-modal.component';
import { DeleteBalanceModalComponent } from './modals/delete-balance-modal/delete-balance-modal.component';
import { UpdateBalanceModalComponent } from './modals/update-balance-modal/update-balance-modal.component';

@NgModule({
  declarations: [
    BalanceComponent,
    CreateBalanceModalComponent,
    UpdateBalanceModalComponent,
    DeleteBalanceModalComponent,
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneInputModule,
    POneBreadcrumbModule,
    POneSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    POneContextMenuModule,
    NgbPaginationModule,
    StoreModule.forFeature(BALANCE_KEY, balanceReducer),
    EffectsModule.forFeature([BalanceEffects]),
    POneDialogModule,
    POneGridModule,
    NgxCurrencyModule,
    POneFlexModule,
  ],
  providers: [BalanceFacade],
})
export class BalanceModule {}
