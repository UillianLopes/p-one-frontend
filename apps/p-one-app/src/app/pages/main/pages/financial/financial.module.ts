import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FinancialComponent } from './financial.component';
import { MainRoutingModule } from './financial.routing';

@NgModule({
  declarations: [FinancialComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class FinancialModule {}
