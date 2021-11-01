import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FinancialComponent } from './financial.component';
import { FinancialRoutingModule } from './financial.routing';

@NgModule({
  declarations: [FinancialComponent],
  imports: [CommonModule, FinancialRoutingModule],
})
export class FinancialModule {}
