import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { POneFlexModule } from '../flex/flex.module';
import { POneInputModule } from '../input';
import { DetailsFieldComponent } from './details-field/details-field.component';
import { DetailsInputDirective } from './details-input.directive';

@NgModule({
  declarations: [DetailsFieldComponent, DetailsInputDirective],
  imports: [CommonModule, POneFlexModule, POneInputModule, ReactiveFormsModule],
  exports: [DetailsFieldComponent, DetailsInputDirective],
})
export class POneDetailsModule {}
