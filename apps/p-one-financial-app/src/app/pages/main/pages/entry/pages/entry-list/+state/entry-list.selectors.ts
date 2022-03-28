import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterDisplayData } from '@p-one/shared';

import { ENTRY_LIST_KEY, EntryListState } from './entry-list.reducer';

export const stateSelector =
  createFeatureSelector<EntryListState>(ENTRY_LIST_KEY);

export const entriesSelector = createSelector(
  stateSelector,
  ({ entries }) => entries
);

export const loadingSelector = createSelector(
  stateSelector,
  ({ loading }) => loading
);

export const filterSelector = createSelector(
  stateSelector,
  ({ filter }) => filter ?? {}
);

export const paginationSelector = createSelector(
  stateSelector,
  ({ pagination }) => pagination
);

export const pageSelector = createSelector(
  paginationSelector,
  ({ page }) => page
);

export const pageSizeSelector = createSelector(
  paginationSelector,
  ({ pageSize }) => pageSize
);

export const typeFilterSelecotr = createSelector(
  filterSelector,
  ({ type }) => type
);

export const entryTypeSelector = createSelector(
  stateSelector,
  ({ entryType }) => entryType
);

export const filterToDisplaySelector = createSelector(
  filterSelector,
  ({ categories, subCategories, text, minValue, maxValue }) => {
    let data: FilterDisplayData[] = [];

    if (categories && categories.length > 0) {
      data = [
        ...data,
        {
          id: 'CATEGORY',
          name: 'Categorias',
          value: categories.map((c) => c.name),
        },
      ];
    }

    if (subCategories && subCategories.length > 0) {
      data = [
        ...data,
        {
          id: 'SUB_CATEGORY',
          name: 'Sub categorias',
          value: subCategories.map((c) => c.name),
        },
      ];
    }

    if (minValue || maxValue) {
      data = [
        ...data,
        {
          id: 'RANGE',
          name: 'Range',
          value: `${minValue ?? '~'} a ${maxValue ?? '~'}`,
        },
      ];
    }

    if (text) {
      data = [
        ...data,
        {
          id: 'TEXT',
          name: 'Texto',
          value: text,
        },
      ];
    }

    return data;
  }
);
