import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneFlexModule } from '../flex/flex.module';
import { POneTooltipModule } from '../tooltip';
import { ButtonOptionComponent } from './button-option/button-option.component';
import { ButtonWithOptionsComponent } from './button-with-options.component';

@NgModule({
  declarations: [ButtonWithOptionsComponent, ButtonOptionComponent],
  imports: [CommonModule, POneTooltipModule, POneFlexModule],
  exports: [ButtonWithOptionsComponent, ButtonOptionComponent],
})
export class POneButtonWithOptionsModule {}
