import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import {
  POneBreadcrumbModule,
  POneColorPickerModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { SubCategoryEffects } from './+state/sub-category.effects';
import { SubCategoryFacade } from './+state/sub-category.facade';
import { SUB_CATEGORY_KEY, subCategoryReducer } from './+state/sub-category.reducer';
import { CreateSubCategoryModalComponent } from './modals/create-sub-category-modal/create-sub-category-modal.component';
import { DeleteSubCategoryModalComponent } from './modals/delete-sub-category-modal/delete-sub-category-modal.component';
import { UpdateSubCategoryModalComponent } from './modals/update-sub-category-modal/update-sub-category-modal.component';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryRoutingModule } from './sub-category.routing';

function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/sub-categories/',
    '.json'
  );
}

@NgModule({
  declarations: [
    SubCategoryComponent,
    CreateSubCategoryModalComponent,
    UpdateSubCategoryModalComponent,
    DeleteSubCategoryModalComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(SUB_CATEGORY_KEY, subCategoryReducer),
    EffectsModule.forFeature([SubCategoryEffects]),
    SubCategoryRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    POneDialogModule,
    POneInputModule,
    ReactiveFormsModule,
    FormsModule,
    POneContextMenuModule,
    POneFlexModule,
    NgbPaginationModule,
    POneBreadcrumbModule,
    POneColorPickerModule,
    POneNotificationsDisplayButtonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
  ],
  providers: [SubCategoryFacade],
})
export class SubCategoryModule {
  constructor(service: TranslateService, @Inject(LOCALE_ID) locale: string) {
    service.use(locale);
  }
}
