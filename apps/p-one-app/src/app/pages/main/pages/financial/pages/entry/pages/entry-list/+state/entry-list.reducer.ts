import { Action, createReducer, on } from '@ngrx/store';
import { EntryFilter, EntryModel } from '@p-one/core';

import {
  loadEntries,
  loadEntriesFailure,
  loadEntriesSuccess,
  paginateEntries,
  paginateEntriesFailure,
  paginateEntriesSuccess,
  resetState,
} from './entry-list.actions';

export const ENTRY_LIST_KEY = 'FINANCIAL_ENTRY_LIST';
export interface EntryListState {
  loading: boolean;
  filter: Partial<EntryFilter>;
  entries: EntryModel[];
  error?: any;
}

const initialState: EntryListState = {
  loading: false,
  entries: [],
  filter: {
    page: 1,
    pageSize: 50,
  },
};

const _entityListReducer = createReducer<EntryListState>(
  initialState,

  on(loadEntries, (state, _) => {
    return { ...state, loading: true };
  }),

  on(loadEntriesSuccess, (state, action) => {
    return { ...state, entries: action.entries, loading: false };
  }),

  on(loadEntriesFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),

  on(paginateEntries, (state, _) => {
    return { ...state, loading: true };
  }),

  on(paginateEntriesSuccess, (state, action) => {
    return {
      ...state,
      entries: action.entries,
      filter: {
        ...state.filter,
        ...action.pagination,
      },
      loading: false,
    };
  }),

  on(paginateEntriesFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),

  on(resetState, (_) => {
    return {
      ...initialState,
    };
  })
);

export function entityListReducer(state: EntryListState, action: Action) {
  return _entityListReducer(state, action);
}
