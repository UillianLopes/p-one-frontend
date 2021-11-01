import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { POneContainerModule, POneHeaderModule, POneSidenavModule } from '@p-one/shared';

import { CategoryListEffects } from './+state/category-list.effects';
import { CategoryListFacade } from './+state/category-list.facade';
import { CATEGORY_LIST_KEY, categoryListReducer } from './+state/category-list.reducer';
import { CategoryListComponent } from './category-list.component';
import { CategoryListRoutingModule } from './category-list.routing';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    CategoryListRoutingModule,
    POneContainerModule,
    POneHeaderModule,
    POneSidenavModule,
    StoreModule.forFeature(CATEGORY_LIST_KEY, categoryListReducer),
    EffectsModule.forFeature([CategoryListEffects]),
  ],
  providers: [CategoryListFacade],
})
export class CategoryListModule {}
