import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import { POneBreadcrumbModule, POneContainerModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';

import { ProfilesComponent } from './profiles.component';
import { ProfilesRoutingModule } from './profiles.routing';

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneNotificationsDisplayButtonModule,
    POneBreadcrumbModule,
    TranslateModule,
  ],
})
export class ProfilesModule {}
