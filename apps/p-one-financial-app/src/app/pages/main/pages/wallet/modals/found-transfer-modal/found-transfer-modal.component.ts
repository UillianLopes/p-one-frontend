import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsStoreFacade } from '@p-one/admin';
import { WalletModel } from '@p-one/financial';
import { PONE_DIALOG_DATA } from '@p-one/shared';

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
    origin: this._formBuilder.group({
      wallet: [this.wallet, Validators.required],
      category: [null, Validators.required],
      subCategory: [null, Validators.required],
    }),
    destination: this._formBuilder.group({
      wallet: [this.wallet, Validators.required],
      category: [null, Validators.required],
      subCategory: [null, Validators.required],
    }),
    value: [0.0, Validators.required],
  });

  public readonly origin = this.form.get('origin') as FormGroup;
  public readonly destination = this.form.get('destination') as FormGroup;

  public readonly isLoading$ = this._store.isLoading$;
  public readonly debitCategories$ = this._store.debitCategories$;
  public readonly creditCategories$ = this._store.creditCategories$;
  public readonly wallets$ = this._store.wallets$;
  public readonly settingsCurrency$ =
    this._settingsStoreFacade.settingsCurrency$;
  public readonly hasData$ = this._store.hasData$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: FoundTransferModalStore,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    @Inject(PONE_DIALOG_DATA) public readonly wallet: WalletModel
  ) {
    this._store.setData(wallet);
  }

  ngOnInit(): void {
    this._store.load();
  }

  transfer(): void {}
}
