import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EEntryPaymentStatus } from '@p-one/domain/financial';
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
  ({ operation }) => operation
);

export const entryTypeSelector = createSelector(
  stateSelector,
  ({ entryType }) => entryType
);

export const filterToDisplaySelector = createSelector(
  filterSelector,
  ({ categories, subCategories, text, minValue, maxValue, paymentStatus }) => {
    let data: FilterDisplayData[] = [];

    if (categories && categories.length > 0) {
      data = [
        ...data,
        {
          id: 'CATEGORY',
          name: '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.CATEGORIES',
          value: categories.map((c) => c.name),
        },
      ];
    }

    if (subCategories && subCategories.length > 0) {
      data = [
        ...data,
        {
          id: 'SUB_CATEGORY',
          name: '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.SUB_CATEGORIES',
          value: subCategories.map((c) => c.name),
        },
      ];
    }

    if (minValue || maxValue) {
      data = [
        ...data,
        {
          id: 'RANGE',
          name: '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.RANGE',
          value: `${minValue ?? '~'} a ${maxValue ?? '~'}`,
        },
      ];
    }

    if (text) {
      data = [
        ...data,
        {
          id: 'TEXT',
          name: '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.TEXT',
          value: text,
        },
      ];
    }
    if (paymentStatus) {
      let paymentName = '';

      switch (paymentStatus) {
        case EEntryPaymentStatus.Opened:
          paymentName = '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.PAYMENT_STATUS.OPENED';
          break;
        case EEntryPaymentStatus.Overdue:
          paymentName = '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.PAYMENT_STATUS.OVERDUE';
          break;
        case EEntryPaymentStatus.Paid:
          paymentName = '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.PAYMENT_STATUS.PAID';
          break;
        case EEntryPaymentStatus.ToPayToday:
          paymentName = '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.PAYMENT_STATUS.TO_PAY_TODAY';
          break;
      }

      data = [
        ...data,
        {
          id: 'PAYMENT_STATUS',
          name: '@PONE.FINANCIAL.ENTRIES.LIST.FILTER.PAYMENT_STATUS.TITLE',
          value: paymentName,
        },
      ];
    }

    return data;
  }
);
