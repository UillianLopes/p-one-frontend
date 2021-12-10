import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LIST_ITEM_KEY, ListItemState } from './list-item.reducer';

const stateSelector = createFeatureSelector<ListItemState>(LIST_ITEM_KEY);

export const itemSelector = createSelector(stateSelector, (s) => s.item);
