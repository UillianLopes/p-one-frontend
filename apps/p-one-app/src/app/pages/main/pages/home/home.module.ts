import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule, POneUserSidenavItemModule } from '@p-one/features/shared';
import { POneCardModule, POneContainerModule, POneFirstNamePipe, POneHeaderModule, POneSidenavModule } from '@p-one/shared';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    POneCardModule,
    POneContainerModule,
    POneHeaderModule,
    POneNotificationsDisplayButtonModule,
    POneSidenavModule,
    TranslateModule,
    POneFirstNamePipe,
    POneUserSidenavItemModule,
  ],
})
export class HomeModule {}
