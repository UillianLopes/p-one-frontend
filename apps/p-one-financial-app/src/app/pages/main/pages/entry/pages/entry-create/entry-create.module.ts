import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/notification';
import {
  POneBreadcrumbModule,
  POneContainerModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
  POneStepperModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { EntryCreateEffects } from './+state/entry-create.effects';
import { EntryCreateFacade } from './+state/entry-create.facade';
import {
  ENTRY_CREATE_KEY,
  entryCreateReducer,
} from './+state/entry-create.reducer';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { ThirdStepComponent } from './components/third-step/third-step.component';
import { EntryCreateComponent } from './entry-create.component';
import { EntryCreateRoutingModule } from './entry-create.routing';

@NgModule({
  declarations: [
    EntryCreateComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
  ],
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
    NgxCurrencyModule,
    POneBreadcrumbModule,
    POneNotificationsDisplayButtonModule,
  ],
  providers: [EntryCreateFacade],
})
export class EntryCreateModule {}
