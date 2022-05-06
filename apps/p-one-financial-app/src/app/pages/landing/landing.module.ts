import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneSignUpModule } from '@p-one/admin';
import { POneContainerModule, POneFlexModule, POneHeaderModule } from '@p-one/shared';

import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneFlexModule,
    POneSignUpModule,
  ],
})
export class LandingModule {}
