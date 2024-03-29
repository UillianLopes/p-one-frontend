import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  POneBreadcrumbModule,
  POneButtonModule,
  POneContainerModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
  POneTableContainerModule,
  POneTableUtilsModule,
} from '@p-one/shared';

import { ProfilesListStoreModule } from './+state/profiles-list-store.module';
import { ProfilesListComponent } from './profiles-list.component';
import { ProfilesRoutingModule as ProfilesListRoutingModule } from './profiles-list.routing';

@NgModule({
  declarations: [ProfilesListComponent],
  imports: [
    CommonModule,
    ProfilesListRoutingModule,
    ProfilesListStoreModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneNotificationsDisplayButtonModule,
    POneBreadcrumbModule,
    POneTableContainerModule,
    POneInputModule,
    TranslateModule,
    POneTableUtilsModule,
    POneButtonModule,
  ],
})
export class ProfilesListModule {}
