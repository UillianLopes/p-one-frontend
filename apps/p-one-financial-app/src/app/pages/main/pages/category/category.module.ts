import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@p-one/core';
import { POneNotificationsDisplayButtonModule } from '@p-one/notification';
import {
  POneBreadcrumbModule,
  POneColorPickerModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFlexModule,
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { CategoryEffects } from './+state/category.effects';
import { CategoryFacade } from './+state/category.facade';
import { CATEGORY_KEY, categoryReducer } from './+state/category.reducer';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category.routing';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';
import { DeleteCategoryModalComponent } from './modals/delete-category-modal/delete-category-modal.component';
import { UpdateCategoryModalComponent } from './modals/update-category-modal/update-category-modal.component';

function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/categories/', '.json');
}
@NgModule({
  declarations: [
    CategoryComponent,
    CreateCategoryModalComponent,
    UpdateCategoryModalComponent,
    DeleteCategoryModalComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    StoreModule.forFeature(CATEGORY_KEY, categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
    POneDialogModule,
    POneInputModule,
    ReactiveFormsModule,
    FormsModule,
    POneContextMenuModule,
    POneFlexModule,
    NgbPaginationModule,
    POneGridModule,
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
  providers: [CategoryFacade],
})
export class CategoryModule {
  constructor(service: TranslateService, @Inject(LOCALE_ID) locale: string) {
    service.use(locale);
  }
}
