import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsStoreModule } from '@p-one/financial';
import {
  POneChartModule,
  POneContainerModule,
  POneFlexModule,
  POnePipesModule,
  POneSidenavModule,
  POneTooltipModule,
} from '@p-one/shared';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    POneChartModule,
    POneSidenavModule,
    POneContainerModule,
    POneFlexModule,
    POnePipesModule,
    POneTooltipModule,
    NotificationsStoreModule,
  ],
})
export class MainModule {}
