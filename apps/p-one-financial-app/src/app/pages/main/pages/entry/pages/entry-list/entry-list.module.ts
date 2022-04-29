import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@p-one/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import {
  POneBreadcrumbModule,
  POneChipModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFilterDisplayModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneMonthYearPickerModule,
  POneSidenavModule,
  POneTooltipModule,
} from '@p-one/shared';
import { NgxCurrencyModule } from 'ngx-currency';

import { EntryListEffects } from './+state/entry-list.effects';
import { EntryListFacade } from './+state/entry-list.facade';
import { entityListReducer as entryListReducer, ENTRY_LIST_KEY } from './+state/entry-list.reducer';
import { EntryListComponent } from './entry-list.component';
import { EntryListRoutingModule } from './entry-list.routing';
import { DeleteEntryModalComponent } from './modals/delete-entry-modal/delete-entry-modal.component';
import { EntryListFilterComponent } from './modals/entry-list-filter/entry-list-filter.component';
import { PayEntryModalComponent } from './modals/pay-entry-modal/pay-entry-modal.component';

function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/entries/list/', '.json');
}

@NgModule({
  declarations: [
    EntryListComponent,
    EntryListFilterComponent,
    DeleteEntryModalComponent,
    PayEntryModalComponent,
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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [EntryListFacade],
})
export class EntryListModule {
  constructor(service: TranslateService, @Inject(LOCALE_ID) locale: string) {
    service.use(locale);
  }
}
