import { EBalanceType } from '../enums';
import { BankModel } from './bank.model';

export interface BalanceModel {
  id: string;
  name: string;
  value: number;
  number: string;
  agency: string;
  bank?: BankModel;
  credits?: number;
  debits?: number;
  type: EBalanceType;
}
