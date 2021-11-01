import { createAction, props, union } from '@ngrx/store';
import { EntryModel, PaginatedFilter } from '@p-one/core';

export enum EEntryListActions {
  LOAD_ENTRIES = '[Entry List] Load entries',
  LAOD_ENTRIES_SUCCESS = '[Entry List] Load entries success',
  LAOD_ENTRIES_FAILURE = '[Entry List] Load entries fail',

  PAGINATE_ENTRIES = '[Entry List] Paginate entries',
  PAGINATE_ENTRIES_SUCCESS = '[Entry List] Paginate entries success',
  PAGINATE_ENTRIES_FAILURE = '[Entry List] Paginate entries fail',

  RESET_STATE = '[Entry List] Reset state',
}

export const loadEntries = createAction(EEntryListActions.LOAD_ENTRIES);

export const loadEntriesSuccess = createAction(
  EEntryListActions.LAOD_ENTRIES_SUCCESS,
  props<{ entries: EntryModel[] }>()
);
export const loadEntriesFailure = createAction(
  EEntryListActions.LAOD_ENTRIES_FAILURE,
  props<{ error: any }>()
);

export const paginateEntries = createAction(
  EEntryListActions.PAGINATE_ENTRIES,
  props<{ pagination: PaginatedFilter }>()
);

export const paginateEntriesSuccess = createAction(
  EEntryListActions.PAGINATE_ENTRIES_SUCCESS,
  props<{ pagination: PaginatedFilter; entries: EntryModel[] }>()
);

export const paginateEntriesFailure = createAction(
  EEntryListActions.PAGINATE_ENTRIES_FAILURE,
  props<{ error: any }>()
);

export const resetState = createAction(EEntryListActions.RESET_STATE);

const actionsUnion = union({
  loadEntries,
  loadEntriesSuccess,
  loadEntriesFailure,

  paginateEntries,
  paginateEntriesSuccess,
  paginateEntriesFailure,

  resetState,
});

export type EntryListActionsUnion = typeof actionsUnion;
