import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { POneUserSidenavItemModule } from '@p-one/features/shared';

import {
  POneChartModule,
  POneContainerModule,
  POneFirstNamePipe,
  POneFlexModule,
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
    POneFirstNamePipe,
    POneTooltipModule,
    POneUserSidenavItemModule,
    TranslateModule,
  ],
})
export class FinancialModule {}
