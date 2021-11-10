import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, OverlayModule],
})
export class POneToastModule {
  static forRoot(): ModuleWithProviders<POneToastModule> {
    return {
      ngModule: POneToastModule,
      providers: [ToastService],
    };
  }
}
