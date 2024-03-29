import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { IDENTITY_API_URL } from './constants';
import { AuthGuard, WithoutAuthGuard } from './guards';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [CommonModule],
})
export class POneIdentityDomainModule {
  static forRoot({
    endpoint: identityApiUrl,
  }: {
    endpoint: string;
  }): ModuleWithProviders<POneIdentityDomainModule> {
    return {
      ngModule: POneIdentityDomainModule,
      providers: [
        {
          provide: IDENTITY_API_URL,
          useValue: identityApiUrl,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        AuthGuard,
        WithoutAuthGuard,
      ],
    };
  }
}
