import { EBalanceType } from '../enums';

export interface UpdateBalanceRequest {
  name: string;
  value: number;
  type: EBalanceType;
  agency: string;
  bankId: string;
  number: string;
  id: string;
}
