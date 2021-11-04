import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputDirective } from './input.directive';
import { InvalidFeedbackDirective } from './invalid-feedback.directive';
import { LabelDirective } from './label.directive';

@NgModule({
  declarations: [
    FormFieldComponent,
    InputDirective,
    LabelDirective,
    InvalidFeedbackDirective,
    CheckboxComponent,
  ],
  imports: [CommonModule, NgxMaskModule, ReactiveFormsModule],
  exports: [
    FormFieldComponent,
    InputDirective,
    LabelDirective,
    InvalidFeedbackDirective,
    CheckboxComponent,
  ],
})
export class POneInputModule {}
