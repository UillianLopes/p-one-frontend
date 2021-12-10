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
  POneGridModule,
  POneHeaderModule,
  POneInputModule,
  POneSidenavModule,
} from '@p-one/shared';

import { CategoryEffects } from './+state/category.effects';
import { CategoryFacade } from './+state/category.facade';
import { CATEGORY_KEY, categoryReducer } from './+state/category.reducer';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category.routing';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';
import { DeleteCategoryModalComponent } from './modals/delete-category-modal/delete-category-modal.component';
import { UpdateCategoryModalComponent } from './modals/update-category-modal/update-category-modal.component';

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
  ],
  providers: [CategoryFacade],
})
export class CategoryModule {}
