import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { POneCardModule, POneDatepickerModule, POneFlexModule, POneGridModule, POneInputModule } from '@p-one/shared';
import { AuthenticationStoreModule } from '@p-one/stores/identity';

import { CreateStandaloneUserComponent } from './create-standalone-user.component';

@NgModule({
  declarations: [CreateStandaloneUserComponent],
  imports: [
    CommonModule,
    POneCardModule,
    ReactiveFormsModule,
    POneGridModule,
    POneInputModule,
    TranslateModule,
    POneFlexModule,
    AuthenticationStoreModule,
    POneDatepickerModule,
  ],
  exports: [CreateStandaloneUserComponent],
})
export class CreateStandaloneUserModule {}
