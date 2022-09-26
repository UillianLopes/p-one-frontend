import { AbstractControl, ValidationErrors } from '@angular/forms';
import { OptionModel } from '@p-one/core';
import { WalletOptionModel } from '@p-one/domain/financial';

export interface FoundTransferModalForm {
  wallet: WalletOptionModel;
  category: OptionModel;
  subCategory: OptionModel;
}

export function validateFoundTransfrerModalForm(
  control: AbstractControl
): ValidationErrors | null {
  let result = null;
  const value = control.value;

  if (!value) {
    return { invalidForm: true };
  }

  if (!value.wallet) {
    result = { ...(result || {}), invalidWallet: true };
  }

  if (!value.category) {
    result = { ...(result || {}), invalidCategory: true };
  }

  return result;
}
