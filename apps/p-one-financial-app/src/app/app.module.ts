import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { POneCoreModule } from '@p-one/core';
import { POneFinancialModule } from '@p-one/financial';
import { POneIdentityModule, TOKEN_REQUIRED_ENDPOINTS, UserStoreModule } from '@p-one/identity';
import { POneNotificationModule } from '@p-one/notification';
import { POneToastModule } from '@p-one/shared';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    POneCoreModule.forRoot({
      locale: environment.locale,
      luxonDateFormat: environment.luxonDateFormat,
    }),
    POneFinancialModule.forRoot({
      endpoint: environment.financialEndpoint,
    }),
    POneIdentityModule.forRoot({
      endpoint: environment.identityEndpoint,
    }),
    POneNotificationModule.forRoot({
      endpoint: environment.notificationEndpoint,
    }),
    AuthModule.forRoot({
      config: {
        configId: 'POne.App',
        authority: environment.issuer,
        redirectUrl: window.location.origin + '/user/sign-in',
        postLogoutRedirectUri: window.location.origin + '/user/sign-out',
        clientId: 'POne.App',
        scope: 'openid profile ponefinancialapi ponenotifierapi',
        silentRenew: true,
        responseType: 'code',
        logLevel: LogLevel.None,
        silentRenewUrl: window.location.origin + '/user/sign-in',
      },
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UserStoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    POneToastModule.forRoot(),
    NgbModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule.forRoot({
      align: 'right',
      allowNegative: true,
      allowZero: true,
      decimal: ',',
      precision: 2,
      prefix: 'R$ ',
      suffix: '',
      thousands: '.',
      nullable: true,
      inputMode: CurrencyMaskInputMode.FINANCIAL,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: TOKEN_REQUIRED_ENDPOINTS,
      useValue: [
        environment.financialEndpoint,
        environment.notificationEndpoint,
      ],
    },
  ],
})
export class AppModule {}
