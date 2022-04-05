import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [CommonModule],
})
export class POneIdentityModule {
  static forRoot(): ModuleWithProviders<POneIdentityModule> {
    return {
      ngModule: POneIdentityModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
