import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileDetailsStoreModule } from './+state/profile-details-store.module';
import { ProfileDetailsComponent } from './profile-details.component';
import { ProfileDetailsRoutingModule } from './profile-details.routing';

@NgModule({
  declarations: [ProfileDetailsComponent],
  imports: [
    CommonModule,
    ProfileDetailsRoutingModule,
    ProfileDetailsStoreModule,
  ],
})
export class ProfileDetailsModule {}
