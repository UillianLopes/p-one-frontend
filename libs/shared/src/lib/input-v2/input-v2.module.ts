import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputV2Directive } from './input-v2.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [InputV2Directive],
  exports: [InputV2Directive],
})
export class POneInputV2Module {}
