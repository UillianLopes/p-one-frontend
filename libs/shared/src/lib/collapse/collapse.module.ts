import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollapseIndicatorComponent } from './collapse-indicator/collapse-indicator.component';
import { CollapseIndicatorDirective } from './collapse-indicator/collapse-indicator.directive';
import { CollapseTriggerDirective } from './collapse-trigger.directive';
import { CollapseComponent } from './collapse.component';

@NgModule({
  declarations: [
    CollapseComponent,
    CollapseTriggerDirective,
    CollapseIndicatorComponent,
    CollapseIndicatorDirective,
  ],
  imports: [CommonModule],
  exports: [
    CollapseComponent,
    CollapseTriggerDirective,
    CollapseIndicatorComponent,
    CollapseIndicatorDirective,
  ],
})
export class POneCollapseModule {}
