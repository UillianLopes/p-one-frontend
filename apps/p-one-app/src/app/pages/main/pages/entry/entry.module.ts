import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { POneDialogModule, POneGridModule, POneInputModule } from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry.routing';
import { DeleteEntryModalComponent } from './modals/delete-entry-modal/delete-entry-modal.component';
import { PayEntryModalComponent } from './modals/pay-entry-modal/pay-entry-modal.component';

@NgModule({
  declarations: [
    EntryComponent,
    DeleteEntryModalComponent,
    PayEntryModalComponent,
  ],
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
