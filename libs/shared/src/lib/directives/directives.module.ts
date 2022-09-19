import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterLinkDisabledDirective } from './router-link-disabled.directive';
import { StopPropagationDirective } from './stop-propagation.directive';

@NgModule({
  declarations: [StopPropagationDirective, RouterLinkDisabledDirective],
  imports: [CommonModule],
  exports: [StopPropagationDirective, RouterLinkDisabledDirective],
})
export class DirectivesModule {}
