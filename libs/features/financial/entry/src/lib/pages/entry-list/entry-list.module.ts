import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/features/shared';
import {
  EllipsisDirective,
  POneBreadcrumbModule,
  POneButtonModule,
  POneChipModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDatepickerModule,
  POneDetailsModule,
  POneDialogModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneLoadingModule,
  POneMonthYearPickerModule,
  POneRolesModule,
  POneSidenavModule,
  POneTableContainerModule,
  POneTableUtilsModule,
  POneTooltipModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { EntryListEffects } from './+state/entry-list.effects';
import { EntryListFacade } from './+state/entry-list.facade';
import { entityListReducer as entryListReducer, ENTRY_LIST_KEY } from './+state/entry-list.reducer';
import { EntryListComponent } from './entry-list.component';
import { EntryListRoutingModule } from './entry-list.routing';
import { DeleteEntryModalComponent } from './modals/delete-entry-modal/delete-entry-modal.component';
import { EntryDetailsModalComponent } from './modals/entry-details-modal/entry-details-modal.component';
import { EntryListFilterComponent } from './modals/entry-list-filter/entry-list-filter.component';
import { PayEntryModalComponent } from './modals/pay-entry-modal/pay-entry-modal.component';

@NgModule({
  declarations: [
    EntryListComponent,
    EntryListFilterComponent,
    DeleteEntryModalComponent,
    PayEntryModalComponent,
    EntryDetailsModalComponent,
  ],
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
    POneBreadcrumbModule,
    POneFlexModule,
    POneMonthYearPickerModule,
    POneInputModule,
    POneDialogModule,
    POneGridModule,
    POneChipModule,
    POneContextMenuModule,
    NgxCurrencyModule,
    POneTooltipModule,
    POneNotificationsDisplayButtonModule,
    TranslateModule,
    EllipsisDirective,
    POneTableContainerModule,
    POneDetailsModule,
    POneDatepickerModule,
    POneLoadingModule,
    POneTableUtilsModule,
    POneButtonModule,
    POneRolesModule,
  ],
  providers: [EntryListFacade],
})
export class EntryListModule {}
