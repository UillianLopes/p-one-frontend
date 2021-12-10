import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  POneChartModule,
  POneContainerModule,
  POneFlexModule,
  POneGridModule,
  POnePipesModule,
  POneSidenavModule,
} from '@p-one/shared';

import { ListItemModule } from './components/list-item/list-item.module';
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
    POnePipesModule,
    POneGridModule,
    ListItemModule,
  ],
})
export class HomeModule {}
