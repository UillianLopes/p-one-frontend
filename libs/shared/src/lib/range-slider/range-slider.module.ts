import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RangeSliderComponent } from './range-slider.component';

@NgModule({
  declarations: [RangeSliderComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [RangeSliderComponent],
})
export class RangeSliderModule {}
