import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WalletStoreModule } from '@p-one/features/financial/wallet';
import { POneNotificationsDisplayButtonModule, WalletCardModule } from '@p-one/features/shared';
import {
  ListModule,
  POneButtonModule,
  POneCardModule,
  POneChartModule,
  POneContainerModule,
  POneDetailsModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';

import { HomeStoreModule } from './+state/home-store.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { ShortcutComponent } from './shortcuts-section/shortcut/shortcut.component';
import { ShortcutsSectionComponent } from './shortcuts-section/shortcuts-section.component';
import { WalletsSectionComponent } from './wallets-section/wallets-section.component';

@NgModule({
  declarations: [
    HomeComponent,
    WalletsSectionComponent,
    ShortcutsSectionComponent,
    ShortcutComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ListModule,
    POneDetailsModule,
    POneInputModule,
    ReactiveFormsModule,
    HomeStoreModule,
    WalletCardModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneNotificationsDisplayButtonModule,
    TranslateModule,
    POneFlexModule,
    POneCardModule,
    POneButtonModule,
    WalletStoreModule,
    POneChartModule
  ],
})
export class HomeModule {}
