import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneLoadingModule } from '../loading';
import { CardComponent } from './card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, POneLoadingModule],
  exports: [CardComponent],
})
export class POneCardModule {}
