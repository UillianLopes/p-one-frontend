import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry.routing';
import { EntryCreateComponent } from './pages/entry-create/entry-create.component';

@NgModule({
  declarations: [EntryComponent, EntryCreateComponent],
  imports: [CommonModule, EntryRoutingModule],
  providers: [],
})
export class EntryModule {}
