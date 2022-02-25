import { EWalletType } from '../enums';

export interface UpdateWalletRequest {
  name: string;
  type: EWalletType;
  agency: string;
  bankId: string;
  number: string;
}
