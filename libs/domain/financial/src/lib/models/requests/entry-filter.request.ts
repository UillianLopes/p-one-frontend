import { QueryModel } from '@p-one/core';

import { EEntryOperation, EEntryPaymentStatus } from '../enums';

export interface EntryFilterRequest extends QueryModel {
  text: string;
  month: number;
  year: number;
  type?: EEntryOperation;
  subCategoryIds?: string[];
  categoryIds?: string[];
  paymentStatus: EEntryPaymentStatus;
}
