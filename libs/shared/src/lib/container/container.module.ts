import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneLoadingModule } from '../loading/loading.module';
import { ContainerComponent } from './container.component';

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, POneLoadingModule],
  exports: [ContainerComponent],
})
export class POneContainerModule {}
