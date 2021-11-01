import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [LoadingComponent],
  providers: [LoadingService],
})
export class POneLoadingModule {}
