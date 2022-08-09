import { OptionModel } from '@p-one/core';

import { EEntryPaymentStatus, EEntryType } from '../enums';
import { PaymentModel } from './payment.model';

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
  category: OptionModel;
  subCategory: OptionModel;
  barCode: string;
  paymentStatus: EEntryPaymentStatus;
  currency: string;
  payments: PaymentModel[];
}
