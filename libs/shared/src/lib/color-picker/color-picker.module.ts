import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorChromeModule } from 'ngx-color/chrome';

import { POneInputModule } from '../input';
import { ColorPickerPopupComponent } from './color-picker-popup/color-picker-popup.component';
import { ColorPickerTriggerDirective } from './color-picker-trigger/color-picker-trigger.directive';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDirective } from './color-picker.directive';

@NgModule({
  declarations: [
    ColorPickerDirective,
    ColorPickerPopupComponent,
    ColorPickerTriggerDirective,
    ColorPickerComponent,
  ],
  imports: [
    CommonModule,
    ColorChromeModule,
    POneInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    ColorPickerDirective,
    ColorPickerTriggerDirective,
    ColorPickerComponent,
  ],
})
export class POneColorPickerModule {}
