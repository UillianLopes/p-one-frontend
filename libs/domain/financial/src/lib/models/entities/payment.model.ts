import { WalletModel } from './wallet.model';

export interface PaymentModel {
  value: number;
  fees: number;
  fine: number;
  wallet: WalletModel;
}
