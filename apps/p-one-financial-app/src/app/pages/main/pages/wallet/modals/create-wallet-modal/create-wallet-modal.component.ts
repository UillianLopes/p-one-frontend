import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SettingsStoreFacade } from '@p-one/admin';
import { generateColor } from '@p-one/core';
import { BankModel, EWalletType } from '@p-one/financial';
import { DialogRef } from '@p-one/shared';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { filter, map, startWith, take } from 'rxjs/operators';

import { CreateWalletModalStore } from './create-wallet-modal.state';

@Component({
  selector: 'p-one-create-wallet-modal',
  templateUrl: './create-wallet-modal.component.html',
  styleUrls: ['./create-wallet-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateWalletModalStore],
})
export class CreateWalletModalComponent implements OnInit {
  public readonly EWalletType = EWalletType;
  public readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    value: [0.0, [Validators.required]],
    agency: [],
    bank: [],
    number: [],
    color: [generateColor(), [Validators.required]],
    currency: [],
  });

  public readonly isCreateWalletDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((state) => state === 'INVALID')
  );

  public readonly isLoading$ = this._store.isLoading$;
  public readonly mode$ = this._store.mode$;
  public readonly bankFilter$ = this.form.get('bank').valueChanges.pipe(
    filter((value) => !value || typeof value == 'string'),
    map((value) => ((value as string) ?? '').toLowerCase())
  );

  public readonly filtredBanks$ = combineLatest([
    this.bankFilter$,
    this._store.banks$,
  ]).pipe(
    map(([filter, banks]) =>
      _.filter(
        banks,
        ({ name, code }) =>
          name.toLowerCase().includes(filter) ||
          code.toLowerCase().includes(filter)
      )
    )
  );

  public readonly displayBankFn = (bank: BankModel) =>
    bank ? `${bank.code} - ${bank.name}` : ``;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: CreateWalletModalStore,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    dialogRef: DialogRef
  ) {
    this._store.setDialogId(dialogRef.dialogId);
  }

  public ngOnInit(): void {
    this._store.loadBanks();
    this._settingsStoreFacade.settings$
      .pipe(take(1))
      .subscribe((settings) =>
        this.form.get('currency').setValue(settings.currency)
      );
  }

  public createWallet(): void {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this._store.createWallet(this.form.value);
  }

  public setMode(mode: EWalletType) {
    this._store.setMode(mode);
  }
}
