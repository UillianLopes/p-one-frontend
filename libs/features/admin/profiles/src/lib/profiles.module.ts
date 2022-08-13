import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfilesComponent } from './profiles.component';
import { ProfilesRoutingModule } from './profiles.routing';

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ],
})
export class ProfilesModule {}
