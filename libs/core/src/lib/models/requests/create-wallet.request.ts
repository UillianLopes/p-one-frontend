import { EWalletType } from '../enums';

export interface CreateWalletRequest {
  name: string;
  value: number;
  type: EWalletType;
  agency: string;
  bankId: string;
  number: string;
}
