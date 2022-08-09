import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ToastComponent } from './toast.component';
import { ToastInterceptor } from './toast.interceptor';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, OverlayModule, TranslateModule],
})
export class POneToastModule {
  static forRoot(): ModuleWithProviders<POneToastModule> {
    return {
      ngModule: POneToastModule,
      providers: [
        ToastService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ToastInterceptor,
          multi: true,
        },
      ],
    };
  }
}
