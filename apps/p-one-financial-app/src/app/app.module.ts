import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { POneCoreModule } from '@p-one/core';
import { UserStoreModule } from '@p-one/identity';
import { POneToastModule } from '@p-one/shared';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';

import { POneFinancialModule } from '../../../../libs/financial/src';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    POneCoreModule.forRoot({
      locale: environment.locale,
      luxonDateFormat: environment.luxonDateFormat,
    }),
    POneFinancialModule.forRoot({
      financialApiUrl: environment.financialApiUrl,
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
})
export class AppModule {}
