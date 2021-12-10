import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { POneDialogModule } from '@p-one/shared';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry.routing';
import { DeleteEntryModalComponent } from './modals/delete-entry-modal/delete-entry-modal.component';

@NgModule({
  declarations: [EntryComponent, DeleteEntryModalComponent],
  imports: [CommonModule, EntryRoutingModule, POneDialogModule],
})
export class EntryModule {}
