import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AddressFormModule, POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  POneBreadcrumbModule,
  POneContainerModule,
  POneDatepickerModule,
  POneDialogModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
  POneTableContainerModule,
  POneTableModule,
} from '@p-one/shared';

import { CreateUserModalComponent } from './modals/create-user-modal/create-user-modal.component';
import { UsersStoreModule } from './store/users-store.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users.routing';

@NgModule({
  declarations: [UsersComponent, CreateUserModalComponent],
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
    POneTableContainerModule,
    FormsModule,
    ReactiveFormsModule,
    POneInputModule,
    POneDialogModule,
    POneGridModule,
    AddressFormModule,
    POneDatepickerModule,
    POneTableModule
  ],
})
export class UsersModule {}
