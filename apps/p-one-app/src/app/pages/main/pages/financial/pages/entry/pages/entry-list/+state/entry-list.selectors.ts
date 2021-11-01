import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ENTRY_LIST_KEY, EntryListState } from './entry-list.reducer';

export const stateSelector =
  createFeatureSelector<EntryListState>(ENTRY_LIST_KEY);

export const entriesSelector = createSelector(
  stateSelector,
  (state) => state.entries
);

export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
);

export const filterSelector = createSelector(
    stateSelector,
    (state) => state.filter
  );
  
