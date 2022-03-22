import { Action, createReducer, on } from '@ngrx/store';
import { EEntryType, EntryFilter, EntryModel, PaginatedFilter } from '@p-one/core';

import {
  filterEntries,
  filterEntriesFailure,
  filterEntriesSuccess,
  loadEntriesWithType,
  loadEntriesWithTypeFailure,
  loadEntriesWithTypeSuccess,
  paginateEntries,
  patchEntriesFilterSuccess,
  removeFilter,
  resetState,
} from './entry-list.actions';

export const ENTRY_LIST_KEY = 'FINANCIAL_ENTRY_LIST';
export interface EntryListState {
  loading: boolean;
  filter: Partial<EntryFilter>;
  pagination: PaginatedFilter;
  entries: EntryModel[];
  error?: any;
  entryType?: EEntryType;
}
const now = new Date();

const initialPagination: PaginatedFilter = {
  page: 1,
  pageSize: 50,
};

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
    ...initialPagination,
  },
};

const _entityListReducer = createReducer<EntryListState>(
  initialState,

  on(loadEntriesWithType, (state, { entryType }) => {
    return { ...state, entryType, loading: true };
  }),

  on(loadEntriesWithTypeSuccess, (state, action) => {
    return { ...state, entries: action.entries, loading: false };
  }),

  on(loadEntriesWithTypeFailure, (state, action) => {
    return { ...state, error: action.error, loading: false };
  }),

  on(paginateEntries, (state) => {
    return { ...state, loading: true };
  }),

  on(patchEntriesFilterSuccess, (state, { filter }) => {
    return { ...state, filter: { ...state.filter, ...filter } };
  }),

  on(removeFilter, (state, { id }) => {
    let filter = state.filter;

    switch (id) {
      case 'CATEGORY':
        filter = {
          ...filter,
          categories: undefined,
        };
        break;

      case 'SUB_CATEGORY':
        filter = {
          ...filter,
          subCategories: undefined,
        };
        break;

      case 'TEXT':
        filter = {
          ...filter,
          text: undefined,
        };
        break;

      case 'RANGE':
        filter = {
          ...filter,
          minValue: undefined,
          maxValue: undefined,
        };

        break;

      default:
        filter = {
          ...filter,
        };
        break;
    }

    return {
      ...state,
      filter,
    };
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

  on(resetState, (_) => {
    return {
      ...initialState,
    };
  })
);

export function entityListReducer(state: EntryListState, action: Action) {
  return _entityListReducer(state, action);
}
