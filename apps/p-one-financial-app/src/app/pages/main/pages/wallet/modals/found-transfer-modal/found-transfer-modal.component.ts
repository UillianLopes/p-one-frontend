import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsStoreFacade } from '@p-one/admin';
import { WalletModel } from '@p-one/financial';
import {
  updateValueAndValidityMarkingControlsAreDirty,
  PONE_DIALOG_DATA,
} from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';

import { FoundTransferModalStore } from './found-transfer-modal.state';

@Component({
  selector: 'p-one-found-transfer-modal',
  templateUrl: './found-transfer-modal.component.html',
  styleUrls: ['./found-transfer-modal.component.scss'],
  providers: [FoundTransferModalStore],
})
export class FoundTransferModalComponent implements OnInit {
  public readonly form = this._formBuilder.group({
    title: [null, Validators.required],
    value: [0.0, Validators.required],
    origin: this._formBuilder.group({
      wallet: [this.wallet, Validators.required],
      category: [null, Validators.required],
      subCategory: [null],
    }),
    destination: this._formBuilder.group({
      wallet: [null, Validators.required],
      category: [null, Validators.required],
      subCategory: [null],
    }),
  });

  public readonly origin = this.form.get('origin') as FormGroup;
  public readonly destination = this.form.get('destination') as FormGroup;

  public readonly originWallet = this.origin.get('wallet');
  public readonly destinationWallet = this.destination.get('wallet');

  public readonly isLoading$ = this._store.isLoading$;
  public readonly debitCategories$ = this._store.debitCategories$;
  public readonly creditCategories$ = this._store.creditCategories$;

  public readonly destinationWallets$ = this._store.wallets$;
  public readonly originWallets$ = this._store.wallets$;

  public readonly currency$ = combineLatest([
    this._store.currency$,
    this._settingsStoreFacade.settingsCurrency$,
  ]).pipe(map(([currency, settingsCurrency]) => currency ?? settingsCurrency));

  public readonly hasData$ = this._store.hasData$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: FoundTransferModalStore,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    @Inject(PONE_DIALOG_DATA) public readonly wallet: WalletModel
  ) {
    this._store.setData(wallet);
  }

  public ngOnInit(): void {
    this._store.load();
  }

  public transfer(): void {
    updateValueAndValidityMarkingControlsAreDirty(this.form);

    if (this.form.invalid) return;

    const wasDisabled = this.originWallet.disabled;

    if (wasDisabled) {
      this.originWallet.enable();
    }

    const { title, value, origin, destination } = this.form.value;

    if (wasDisabled) {
      this.originWallet.enable();
    }

    this._store.transfer({
      title,
      value,
      origin: {
        walletId: origin.wallet.id,
        categoryId: origin.category.id,
        subCategoryId: origin.subCategory?.id,
      },
      destination: {
        walletId: destination.wallet.id,
        categoryId: destination.category.id,
        subCategoryId: destination.subCategory?.id,
      },
    });
  }
}
