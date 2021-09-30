import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { POneInputModule } from '../input/input.module';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { DynamicFormGroupComponent } from './dynamic-form-group/dynamic-form-group.component';
import { DynamicFormRowComponent } from './dynamic-form-row/dynamic-form-row.component';

@NgModule({
  declarations: [
    DynamicFormGroupComponent,
    DynamicFormFieldComponent,
    DynamicFormRowComponent,
  ],
  imports: [CommonModule, POneInputModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFormGroupComponent],
})
export class POneDynamicFormsModule {}
