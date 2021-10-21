import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneChartModule, POneContainerModule, POneFlexModule, POneSidenavModule } from '@p-one/shared';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    POneChartModule,
    POneSidenavModule,
    POneContainerModule,
    POneFlexModule,
  ],
})
export class HomeModule {}
