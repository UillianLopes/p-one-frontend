import { AutocompleteModel } from '@p-one/core';

import { EEntryPaymentStatus, EEntryType } from '../enums';

export interface EntryModel {
  id: string;
  type: EEntryType;
  recurrences: number;
  value: number;
  fees: number;
  fine: number;
  title: string;
  index: number;
  dueDate: Date;
  description: string;
  category: AutocompleteModel;
  subCategory: AutocompleteModel;
  barCode: string;
  paymentStatus: EEntryPaymentStatus;
  currency: string;
}
