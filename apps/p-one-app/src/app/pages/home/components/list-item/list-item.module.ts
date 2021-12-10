import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ListItemEffects } from './+state/list-item.effects';
import { ListItemFacade } from './+state/list-item.facade';
import { LIST_ITEM_KEY, listItemReducer } from './+state/list-item.reducer';
import { ListItemComponent } from './list-item.component';

@NgModule({
  declarations: [ListItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(LIST_ITEM_KEY, listItemReducer),
    EffectsModule.forFeature([ListItemEffects]),
  
  ],
  providers: [ListItemFacade],
  exports: [ListItemComponent],
})
export class ListItemModule {}
