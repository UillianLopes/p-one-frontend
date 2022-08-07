import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { POneChipModule } from '../chip/chip.module';
import { POneLoadingModule } from '../loading';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteDirective } from './autocomplete/autocomplete.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputDirective, LargeInputDirective, SmallInputDirective } from './input.directive';
import { InvalidFeedbackDirective } from './invalid-feedback.directive';
import { LabelDirective } from './label.directive';
import { MultipleAutocompleteComponent } from './multiple-autocomplete/multiple-autocomplete.component';
import { OptionComponent } from './option/option.component';
import { RadioButtonComponent } from './radio/radio-button/radio-button.component';
import { RadioComponent } from './radio/radio.component';

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
    RadioButtonComponent,
    RadioComponent,
    MultipleAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule,
    ReactiveFormsModule,
    POneChipModule,
    POneLoadingModule,
  ],
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
    RadioButtonComponent,
    RadioComponent,
    MultipleAutocompleteComponent,
  ],
})
export class POneInputModule {}
