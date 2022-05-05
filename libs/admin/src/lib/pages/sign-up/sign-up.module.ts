import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up.routing';

function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/libs/admin/settings/',
    '.json'
  );
}
@NgModule({
  declarations: [SignUpComponent],
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
        useFactory: httpLoaderFactory,
      },
      isolate: true,
    }),
    SettingsStoreModule,
  ],
  providers: [SignUpFacade],
})
export class SignUpModule {}
