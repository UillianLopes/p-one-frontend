import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { POneCoreModule } from '@p-one/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserStoreModule } from './stores/user-store/user-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    POneCoreModule.forRoot({
      locale: environment.locale,
      luxonDateFormat: environment.luxonDateFormat,
      financialApiUrl: environment.financialApiUrl,
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UserStoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    NgbModule,
    NgxMaskModule.forRoot(),
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:5001',
        redirectUrl: window.location.origin + '/user/sign-in',
        postLogoutRedirectUri: window.location.origin + '/user/sign-out',
        clientId: 'POne.App',
        scope: 'openid profile ponefinancialapi',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.None,
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
