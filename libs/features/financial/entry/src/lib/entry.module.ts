import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  POneDialogModule,
  POneGridModule,
  POneInputModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry.routing';

@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    EntryRoutingModule,
    POneInputModule,
    POneDialogModule,
    POneGridModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class EntryModule {}
