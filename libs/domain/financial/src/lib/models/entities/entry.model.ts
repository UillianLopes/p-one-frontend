import { OptionModel } from '@p-one/core';

import { EEntryOperation, EEntryPaymentStatus } from '../enums';
import { WalletOptionModel } from '../options';
import { PaymentModel } from './payment.model';

export interface EntryModel {
  id?: string;
  parentId?: string;
  type: EEntryOperation;
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
  wallet: WalletOptionModel;
  barCode: string;
  paymentStatus: EEntryPaymentStatus;
  currency: string;
  payments: PaymentModel[];
  recurrenceBegin?: Date;
  recurrenceEnd?: Date;
}
