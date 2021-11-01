import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneContainerModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneHeaderModule,
  POneSidenavModule,
} from '@p-one/shared';

import { EntryListEffects } from './+state/entry-list.effects';
import { EntryListFacade } from './+state/entry-list.facade';
import { entityListReducer as entryListReducer, ENTRY_LIST_KEY } from './+state/entry-list.reducer';
import { EntryListComponent } from './entry-list.component';
import { EntryListRoutingModule } from './entry-list.routing';

@NgModule({
  declarations: [EntryListComponent],
  imports: [
    CommonModule,
    EntryListRoutingModule,
    POneSidenavModule,
    POneContainerModule,
    POneHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ENTRY_LIST_KEY, entryListReducer),
    EffectsModule.forFeature([EntryListEffects]),
    POneFilterDisplayModule,
    POneFlexModule,
  ],
  providers: [EntryListFacade],
})
export class EntryListModule {}
