import { WalletModel } from '@p-one/domain/financial';

export interface PayEntryForm {
  wallet: WalletModel;
  value: number;
  fees: number;
  fine: number;
  entryValue?: number;
}
