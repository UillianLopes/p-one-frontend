import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  POneBreadcrumbModule,
  POneButtonModule,
  POneCardModule,
  POneContainerModule,
  POneDatepickerModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneMonthYearPickerModule,
  POneRolesModule,
  POneSidenavModule,
  POneStepperModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { EntryCreateEffects } from './+state/entry-create.effects';
import { EntryCreateFacade } from './+state/entry-create.facade';
import { ENTRY_CREATE_KEY, entryCreateReducer } from './+state/entry-create.reducer';
import { GeneralInfoCardComponent } from './components/general-info-card/general-info-card.component';
import { InstallmentsCardComponent } from './components/installments-card/installments-card.component';
import { RecurrenceCardComponent } from './components/recurrence-card/recurrence-card.component';
import { EntryCreateComponent } from './entry-create.component';
import { EntryCreateRoutingModule } from './entry-create.routing';

@NgModule({
  declarations: [
    EntryCreateComponent,
    GeneralInfoCardComponent,
    InstallmentsCardComponent,
    RecurrenceCardComponent,
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
    POneCardModule,
    POneButtonModule,
    POneDatepickerModule,
    POneMonthYearPickerModule,
    POneRolesModule,
  ],
  providers: [EntryCreateFacade],
})
export class EntryCreateModule {}
