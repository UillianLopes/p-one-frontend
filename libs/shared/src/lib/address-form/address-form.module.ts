import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { POneFlexModule } from '../flex/flex.module';
import { POneInputModule } from '../input/input.module';
import { AddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [AddressFormComponent],
  imports: [
    CommonModule,
    POneInputModule,
    POneFlexModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddressFormComponent],
})
export class POneAddressFormModule {}
