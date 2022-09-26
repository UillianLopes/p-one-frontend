import { OptionModelWithExtra } from '@p-one/core';

import { WalletModel } from '../entities';

export interface WalletOptionExtrasModel {
  value: number;
  currency?: string;
}

export type WalletOptionModel = OptionModelWithExtra<WalletOptionExtrasModel>;

export function convetWalletIntoOption(
  wallet?: WalletModel
): WalletOptionModel | null {
  return wallet
    ? {
        id: wallet.id,
        title: wallet.name,
        subTitle: wallet.number,
        color: wallet.color,
        extra: {
          value: wallet.value,
          currency: wallet.currency,
        },
      }
    : null;
}
