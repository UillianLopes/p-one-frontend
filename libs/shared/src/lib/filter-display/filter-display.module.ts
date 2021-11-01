import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilterDisplayBadgeComponent } from './filter-display-badge/filter-display-badge.component';
import { FilterDisplayComponent } from './filter-display.component';

@NgModule({
  declarations: [FilterDisplayComponent, FilterDisplayBadgeComponent],
  imports: [CommonModule],
  exports: [FilterDisplayComponent, FilterDisplayBadgeComponent],
})
export class POneFilterDisplayModule {}
