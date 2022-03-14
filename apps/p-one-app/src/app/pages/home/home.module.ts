import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  POneChartModule,
  POneColorPickerModule,
  POneContainerModule,
  POneDatepickerModule,
  POneFlexModule,
  POneGridModule,
  POnePipesModule,
  POneSidenavModule,
  RangeSliderModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

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
    POneDatepickerModule,
    NgxCurrencyModule,
    POneColorPickerModule,
    RangeSliderModule,
  ],
})
export class HomeModule {}
