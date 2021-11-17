import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteDirective } from './autocomplete/autocomplete.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputDirective, LargeInputDirective, SmallInputDirective } from './input.directive';
import { InvalidFeedbackDirective } from './invalid-feedback.directive';
import { LabelDirective } from './label.directive';
import { OptionComponent } from './option/option.component';

@NgModule({
  declarations: [
    FormFieldComponent,
    InputDirective,
    SmallInputDirective,
    LargeInputDirective,
    LabelDirective,
    InvalidFeedbackDirective,
    CheckboxComponent,
    AutocompleteDirective,
    AutocompleteComponent,
    OptionComponent,
  ],
  imports: [CommonModule, NgxMaskModule, ReactiveFormsModule],
  exports: [
    FormFieldComponent,
    InputDirective,
    SmallInputDirective,
    LargeInputDirective,
    LabelDirective,
    InvalidFeedbackDirective,
    CheckboxComponent,
    AutocompleteDirective,
    AutocompleteComponent,
    OptionComponent,
  ],
})
export class POneInputModule {}
