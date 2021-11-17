import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneContainerModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
  POneStepperModule,
} from '@p-one/shared';

import { EntryCreateEffects } from './+state/entry-create.effects';
import { EntryCreateFacade } from './+state/entry-create.facade';
import { ENTRY_CREATE_KEY, entryCreateReducer } from './+state/entry-create.reducer';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { EntryCreateComponent } from './entry-create.component';
import { EntryCreateRoutingModule } from './entry-create.routing';
import { SecondStepComponent } from './components/second-step/second-step.component';

@NgModule({
  declarations: [EntryCreateComponent, FirstStepComponent, SecondStepComponent],
  imports: [
    CommonModule,
    EntryCreateRoutingModule,
    POneSidenavModule,
    POneContainerModule,
    POneHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(ENTRY_CREATE_KEY, entryCreateReducer),
    EffectsModule.forFeature([EntryCreateEffects]),
    POneFilterDisplayModule,
    POneFlexModule,
    POneStepperModule,
    POneInputModule,
    POneGridModule,
    NgbDatepickerModule,
  ],
  providers: [EntryCreateFacade],
})
export class EntryCreateModule {}
