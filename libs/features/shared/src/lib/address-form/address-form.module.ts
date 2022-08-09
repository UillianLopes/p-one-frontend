import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { POneGridModule, POneInputModule } from '@p-one/shared';

import { AddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [AddressFormComponent],
  imports: [
    CommonModule,
    POneInputModule,
    ReactiveFormsModule,
    FormsModule,
    POneGridModule,
    TranslateModule,
  ],
  exports: [AddressFormComponent],
})
export class POneAddressFormModule {}
