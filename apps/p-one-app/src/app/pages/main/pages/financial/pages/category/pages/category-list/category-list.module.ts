import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  POneContainerModule,
  POneContextMenuModule,
  POneDialogModule,
  POneFlexModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';

import { CategoryListEffects } from './+state/category-list.effects';
import { CategoryListFacade } from './+state/category-list.facade';
import { CATEGORY_LIST_KEY, categoryListReducer } from './+state/category-list.reducer';
import { CategoryListComponent } from './category-list.component';
import { CategoryListRoutingModule } from './category-list.routing';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';
import { DeleteCategoryModalComponent } from './modals/delete-category-modal/delete-category-modal.component';
import { UpdateCategoryModalComponent } from './modals/update-category-modal/update-category-modal.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CreateCategoryModalComponent,
    UpdateCategoryModalComponent,
    DeleteCategoryModalComponent,
  ],
  imports: [
    CommonModule,
    CategoryListRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    StoreModule.forFeature(CATEGORY_LIST_KEY, categoryListReducer),
    EffectsModule.forFeature([CategoryListEffects]),
    POneDialogModule,
    POneInputModule,
    ReactiveFormsModule,
    FormsModule,
    POneContextMenuModule,
    POneFlexModule,
    NgbPaginationModule,
  ],
  providers: [CategoryListFacade],
})
export class CategoryListModule {}
