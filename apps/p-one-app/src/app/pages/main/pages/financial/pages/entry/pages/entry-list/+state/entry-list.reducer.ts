import { Action, createReducer, on } from '@ngrx/store';
import { EntryFilter, EntryModel, PaginatedFilter } from '@p-one/core';

import {
  filterEntries,
  filterEntriesFailure,
  filterEntriesSuccess,
  loadEntries,
  loadEntriesFailure,
  loadEntriesSuccess,
  paginateEntries,
  paginateEntriesFailure,
  paginateEntriesSuccess,
  patchEntriesFilterSuccess,
  resetState,
} from './entry-list.actions';

export const ENTRY_LIST_KEY = 'FINANCIAL_ENTRY_LIST';
export interface EntryListState {
  loading: boolean;
  filter: Partial<EntryFilter>;
  pagination: PaginatedFilter;
  entries: EntryModel[];
  error?: any;
}
const now = new Date();

const initialState: EntryListState = {
  loading: false,
  entries: [],
  filter: {
    type: null,
    paymentStatus: null,
    date: {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  },

  pagination: {
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

  on(paginateEntries, (state) => {
    return { ...state, loading: true };
  }),

  on(patchEntriesFilterSuccess, (state, { filter }) => {
    return { ...state, filter: { ...state.filter, ...filter } };
  }),

  on(filterEntries, (state) => {
    return { ...state, loading: true };
  }),

  on(filterEntriesSuccess, (state, { entries }) => {
    return { ...state, entries, loading: false };
  }),

  on(filterEntriesFailure, (state, { error }) => {
    return { ...state, error, loading: false };
  }),

  on(paginateEntriesSuccess, (state, { pagination, entries }) => {
    return {
      ...state,
      pagination,
      entries: entries,
      loading: false,
    };
  }),

  on(paginateEntriesFailure, (state, { error }) => {
    return { ...state, error, loading: false };
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
