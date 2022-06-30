import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsStoreModule } from '@p-one/stores/notifications';
import {
  POneChartModule,
  POneContainerModule,
  POneFlexModule,
  POnePipesModule,
  POneSidenavModule,
  POneTooltipModule,
} from '@p-one/shared';

import { FinancialComponent } from './financial.component';
import { MainRoutingModule } from './financial.routing';

@NgModule({
  declarations: [FinancialComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    POneChartModule,
    POneSidenavModule,
    POneContainerModule,
    POneFlexModule,
    POnePipesModule,
    POneTooltipModule,
    POneNotificationsStoreModule,
    TranslateModule,
  ],
})
export class FinancialModule { }
