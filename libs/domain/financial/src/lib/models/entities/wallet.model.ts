import { NamedModel } from '@p-one/core';

import { EWalletType } from '../enums';
import { BankModel } from './bank.model';

export interface WalletModel extends NamedModel {
  id: string;
  value: number;
  number: string;
  agency: string;
  bank?: BankModel;
  credits?: number;
  debits?: number;
  type: EWalletType;
  color?: string;
  currency?: string;
}
