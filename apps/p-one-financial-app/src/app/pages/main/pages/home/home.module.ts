import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import { POneContainerModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';

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
    POneNotificationsDisplayButtonModule,
  ],
})
export class HomeModule {}
