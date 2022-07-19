import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import { POneBreadcrumbModule, POneContainerModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';
import { UsersStoreModule } from '@p-one/stores/admin';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users.routing';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersStoreModule,
    UsersRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneNotificationsDisplayButtonModule,
    POneBreadcrumbModule,
    TranslateModule,
  ],
})
export class UsersModule {}
