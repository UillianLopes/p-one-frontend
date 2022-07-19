import { QueryModel } from '@p-one/core';

import { EEntryPaymentStatus, EEntryType } from '../enums';

export interface EntryFilterRequest extends QueryModel {
  text: string;
  month: number;
  year: number;
  type?: EEntryType;
  subCategoryIds?: string[];
  categoryIds?: string[];
  paymentStatus: EEntryPaymentStatus;
}
