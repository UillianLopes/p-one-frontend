export interface PayEntryRequest {
  value: number;
  fees: number;
  fine: number;
  walletId: string;
  dueDate?: Date;
  newValue?: number;
}
