import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { POneAdminModule, SettingsFacade, SettingsStoreModule, UserService } from '@p-one/admin';
import { POneCoreModule } from '@p-one/core';
import { POneFinancialModule } from '@p-one/financial';
import { POneIdentityModule, TOKEN_REQUIRED_ENDPOINTS, UserStoreModule } from '@p-one/identity';
import { POneNotificationModule } from '@p-one/notification';
import { POneToastModule } from '@p-one/shared';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { tap } from 'rxjs/operators';

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
      locale: navigator.language ?? environment.locale,
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
    POneAdminModule.forRoot({
      adminEndpoint: environment.adminEndpoint,
    }),
    AuthModule.forRoot({
      config: {
        configId: 'POne.App',
        authority: environment.issuer,
        redirectUrl: window.location.origin + '/user/sign-in',
        postLogoutRedirectUri: window.location.origin + '/user/sign-out',
        clientId: 'POne.App',
        scope: 'openid profile ponefinancialapi ponenotifierapi poneadminapi',
        silentRenew: true,
        responseType: 'code',
        logLevel: LogLevel.None,
        silentRenewUrl: window.location.origin + '/user/sign-in',
      },
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (client: HttpClient) =>
          new TranslateHttpLoader(client, '/assets/i18n/', '.json'),
        deps: [HttpClient],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
      defaultLanguage: 'en',
    }),
    UserStoreModule,
    SettingsStoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: TOKEN_REQUIRED_ENDPOINTS,
      useValue: [
        environment.financialEndpoint,
        environment.notificationEndpoint,
        environment.identityEndpoint,
        environment.adminEndpoint,
      ],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (
        userService: UserService,
        settingsFacade: SettingsFacade
      ) => {
        return () =>
          userService
            .settings()
            .pipe(tap((settings) => settingsFacade.setUserSettings(settings)));
      },
      deps: [UserService, SettingsFacade],
      multi: true,
    },
  ],
})
export class AppModule {}
