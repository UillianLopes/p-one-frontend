import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  POneBreadcrumbModule,
  POneContainerModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
  POneTableContainerModule,
} from '@p-one/shared';
import { UsersStoreModule } from '@p-one/stores/admin/users';

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
    POneInputModule,
    TranslateModule,
    NgbPaginationModule,
    POneTableContainerModule
  ],
})
export class UsersModule {}
