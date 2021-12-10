import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneBreadcrumbModule,
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';

import { SubCategoryEffects } from './+state/sub-category.effects';
import { SubCategoryFacade } from './+state/sub-category.facade';
import { SUB_CATEGORY_KEY, subCategoryReducer } from './+state/sub-category.reducer';
import { CreateSubCategoryModalComponent } from './modals/create-sub-category-modal/create-sub-category-modal.component';
import { DeleteSubCategoryModalComponent } from './modals/delete-sub-category-modal/delete-sub-category-modal.component';
import { UpdateSubCategoryModalComponent } from './modals/update-sub-category-modal/update-sub-category-modal.component';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryRoutingModule } from './sub-category.routing';

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
  ],
  providers: [SubCategoryFacade],
})
export class SubCategoryModule {}
