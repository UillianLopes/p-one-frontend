export interface BalanceModel {
  id: string;
  name: string;
  value: number;

  credits?: number;
  debits?: number;
}
