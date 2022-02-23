import { EWalletType } from '../enums';

export interface UpdateWalletRequest {
  name: string;
  value: number;
  type: EWalletType;
  agency: string;
  bankId: string;
  number: string;
  id: string;
}
