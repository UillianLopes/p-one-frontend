import { EBalanceType } from '../enums';

export interface CreateBalanceRequest {
  name: string;
  value: number;
  type: EBalanceType;
  agency: string;
  bankId: string;
  number: string;
}
