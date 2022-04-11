import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

import { IDENTITY_API_URL } from './constants';
import { AuthGuard, WithoutAuthGuard } from './guards';
import { O_AUTH_CONFIG } from './interceptors/oauth.config';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserService } from './services';

@NgModule({
  imports: [CommonModule],
})
export class POneIdentityModule {
  static forRoot({
    apiUrl: identityApiUrl,
    config,
  }: {
    apiUrl: string;
    config: AuthConfig;
  }): ModuleWithProviders<POneIdentityModule> {
    return {
      ngModule: POneIdentityModule,
      providers: [
        UserService,
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
        {
          provide: O_AUTH_CONFIG,
          useValue: config,
        }
      ],
    };
  }
}
