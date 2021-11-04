import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { POneLoadingModule } from '../loading/loading.module';
import { ContainerComponent } from './container.component';

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, POneLoadingModule, CdkScrollableModule],
  exports: [ContainerComponent],
})
export class POneContainerModule {}
