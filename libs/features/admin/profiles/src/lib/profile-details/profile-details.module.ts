import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  POneButtonModule,
  POneCardModule,
  POneCollapseModule,
  POneContainerModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';

import { ProfileDetailsStoreModule } from './+state/profile-details-store.module';
import { ProfileDetailsComponent } from './profile-details.component';
import { ProfileDetailsRoutingModule } from './profile-details.routing';

@NgModule({
  declarations: [ProfileDetailsComponent],
  imports: [
    CommonModule,
    ProfileDetailsRoutingModule,
    ProfileDetailsStoreModule,
    POneContainerModule,
    POneHeaderModule,
    POneButtonModule,
    POneSidenavModule,
    POneCardModule,
    POneFlexModule,
    POneCollapseModule,
    POneGridModule,
    POneInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class ProfileDetailsModule {}
