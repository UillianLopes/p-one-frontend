import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CreateStandaloneUserModule } from '@p-one/features/admin/standalone-users';
import { POneContainerModule, POneFlexModule, POneHeaderModule, POneInputModule } from '@p-one/shared';

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
    TranslateModule,
    ReactiveFormsModule,
    POneInputModule,
    CreateStandaloneUserModule,
  ],
})
export class LandingModule {}
