import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { FormFieldComponent } from './form-field/form-field.component';
import { InputDirective } from './input.directive';
import { InvalidFeedbackDirective } from './invalid-feedback.directive';
import { LabelDirective } from './label.directive';

@NgModule({
  declarations: [FormFieldComponent, InputDirective, LabelDirective, InvalidFeedbackDirective],
  imports: [CommonModule, NgxMaskModule],
  exports: [FormFieldComponent, InputDirective, LabelDirective, InvalidFeedbackDirective],
})
export class POneInputModule {}
