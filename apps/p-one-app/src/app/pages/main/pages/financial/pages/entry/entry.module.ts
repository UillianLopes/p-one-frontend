import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry.routing';

@NgModule({
  declarations: [EntryComponent],
  imports: [CommonModule, EntryRoutingModule],
  providers: [],
})
export class EntryModule {}
