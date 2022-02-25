import { EWalletType } from '../enums';
import { BankModel } from './bank.model';

export interface WalletModel {
  id: string;
  name: string;
  value: number;
  number: string;
  agency: string;
  bank?: BankModel;
  credits?: number;
  debits?: number;
  type: EWalletType;
}
