import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { POneInputModule } from '../input/input.module';
import { PhoneFormComponent } from './phone-form.component';

@NgModule({
  declarations: [PhoneFormComponent],
  imports: [
    CommonModule,
    POneInputModule,
    NgxMaskModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
  ],
  exports: [PhoneFormComponent],
})
export class POnePhoneFormModule {}
