import { createAction, props, union } from '@ngrx/store';
import {
  EEntryType,
  EntryFilter,
  EntryModel,
  PaginatedFilter,
} from '@p-one/domain/financial';

export enum EEntryListActions {
  LOAD_ENTRIES = '[Entry List] Load entries',
  LAOD_ENTRIES_SUCCESS = '[Entry List] Load entries success',
  LAOD_ENTRIES_FAILURE = '[Entry List] Load entries fail',

  PATCH_ENTRIES_FILTER = '[Entry List] Patch entries filter',
  PATCH_ENTRIES_FILTER_SUCCESS = '[Entry List] Patch entries filter success',

  FILTER_ENTRIES = '[Entry List] Filter entries',
  FILTER_ENTRIES_SUCCESS = '[Entry List] Filter entries success',
  FILTER_ENTRIES_FAILURE = '[Entry List] Filter entries failure',

  REMOVE_FILTER = '[Entry List] Remove filter',

  PAGINATE_ENTRIES = '[Entry List] Paginate entries',
  PAGINATE_ENTRIES_SUCCESS = '[Entry List] Paginate entries success',
  PAGINATE_ENTRIES_FAILURE = '[Entry List] Paginate entries fail',

  OPEN_FILTER_ENTRIES_DIALOG = '[Entry List] Open filter entries dialog',

  OPEN_DELETE_ENTRIES_DIALOG = '[Entry List] Open delete entries dialog',

  OPEN_PAY_ENTRY_DIALOG = '[Entry List] Open pay entry dialog',

  SET_TYPE = '[Entry List] Set type',

  RESET_STATE = '[Entry List] Reset state',
}

export const loadEntriesWithType = createAction(
  EEntryListActions.LOAD_ENTRIES,
  props<{ entryType?: EEntryType }>()
);

export const loadEntriesWithTypeSuccess = createAction(
  EEntryListActions.LAOD_ENTRIES_SUCCESS,
  props<{ entries: EntryModel[] }>()
);

export const loadEntriesWithTypeFailure = createAction(
  EEntryListActions.LAOD_ENTRIES_FAILURE,
  props<{ error: any }>()
);

export const removeFilter = createAction(
  EEntryListActions.REMOVE_FILTER,
  props<{ id: string }>()
);

export const openDeleteEntriesDialog = createAction(
  EEntryListActions.OPEN_DELETE_ENTRIES_DIALOG,
  props<{ entry?: EntryModel }>()
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

export const filterEntries = createAction(EEntryListActions.FILTER_ENTRIES);
export const patchEntriesFilter = createAction(
  EEntryListActions.PATCH_ENTRIES_FILTER,
  props<{ filter: Partial<EntryFilter> }>()
);

export const patchEntriesFilterSuccess = createAction(
  EEntryListActions.PATCH_ENTRIES_FILTER_SUCCESS,
  props<{ filter: Partial<EntryFilter> }>()
);

export const filterEntriesSuccess = createAction(
  EEntryListActions.FILTER_ENTRIES_SUCCESS,
  props<{ entries: EntryModel[] }>()
);

export const filterEntriesFailure = createAction(
  EEntryListActions.FILTER_ENTRIES_FAILURE,
  props<{ error: any }>()
);

export const openPayEntryDialog = createAction(
  EEntryListActions.OPEN_PAY_ENTRY_DIALOG,
  props<{ entry: EntryModel }>()
);

export const openFilterListDialog = createAction(
  EEntryListActions.OPEN_FILTER_ENTRIES_DIALOG
);

export const resetState = createAction(EEntryListActions.RESET_STATE);

const actionsUnion = union({
  loadEntriesWithType,
  loadEntriesWithTypeSuccess,
  loadEntriesWithTypeFailure,

  paginateEntries,
  paginateEntriesSuccess,
  paginateEntriesFailure,
  patchEntriesFilter,

  filterEntries,
  filterEntriesSuccess,
  filterEntriesFailure,

  openDeleteEntriesDialog,
  openPayEntryDialog,

  resetState,
});

export type EntryListActionsUnion = typeof actionsUnion;
