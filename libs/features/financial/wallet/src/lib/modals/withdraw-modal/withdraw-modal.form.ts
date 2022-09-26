import { OptionModel } from '@p-one/core';
import { WalletOptionModel } from '@p-one/domain/financial';

export interface WithdrawModelForm {
  title: string;
  withdraw: number;
  category: OptionModel;
  subCategory: OptionModel;
  wallet: WalletOptionModel;
  dueDate: Date;
}
