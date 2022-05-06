import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomTranslateLoader } from '@p-one/core';
import { UserStoreModule } from '@p-one/identity';
import {
  POneAddressFormModule,
  POneBreadcrumbModule,
  POneCardModule,
  POneContainerModule,
  POneDatepickerModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POneStepperModule,
} from '@p-one/shared';
import { NgxMaskModule } from 'ngx-mask';

import { SettingsStoreModule } from '../../stores';
import { SignUpEffects } from './+state/sign-up-store.effects';
import { SignUpFacade } from './+state/sign-up-store.facade';
import { SIGN_UP_KEY, signUpReducer } from './+state/sign-up-store.reducer';
import { SignUpCardComponent } from './sign-up-card/sign-up-card.component';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.routing';

@NgModule({
  declarations: [SignUpComponent, SignUpCardComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    POneContainerModule,
    POneStepperModule,
    POneInputModule,
    POneAddressFormModule,
    POneCardModule,
    ReactiveFormsModule,
    FormsModule,
    POneHeaderModule,
    POneBreadcrumbModule,
    POneFlexModule,
    UserStoreModule,
    StoreModule.forFeature(SIGN_UP_KEY, signUpReducer),
    EffectsModule.forFeature([SignUpEffects]),
    POneDatepickerModule,
    NgxMaskModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (client: HttpClient) =>
          new CustomTranslateLoader(client, [
            {
              prefix: './assets/i18n/libs/',
              suffix: '.json',
            },
          ]),
        deps: [HttpClient],
      },
      isolate: true,
      defaultLanguage: 'en',
    }),
    SettingsStoreModule,
  ],
  providers: [SignUpFacade],
  exports: [SignUpCardComponent],
})
export class POneSignUpModule {
  constructor(translateService: TranslateService) {
    if (['pt-BR', 'en'].includes(navigator.language)) {
      translateService.use(navigator.language);
    }
  }
}
