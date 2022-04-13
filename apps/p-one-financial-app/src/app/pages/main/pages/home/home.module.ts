import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneContainerModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';
import { NotificationsModule } from 'apps/p-one-financial-app/src/app/components/notifications';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    NotificationsModule,
  ],
})
export class HomeModule {}
