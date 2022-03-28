import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankModel, EWalletType, WalletModel } from '@p-one/core';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { UpdateWalletModalStore } from './update-wallet-modal.state';

@Component({
  selector: 'p-one-update-wallet-modal',
  templateUrl: './update-wallet-modal.component.html',
  styleUrls: ['./update-wallet-modal.component.scss'],
  providers: [UpdateWalletModalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateWalletModalComponent implements OnInit {
  public readonly EWalletType = EWalletType;
  public readonly isLoading$ = this._store.isLoading$;
  public readonly type$ = this._store.type$;
  public readonly form = this._formBuilder.group({
    id: [this.data?.id, [Validators.required]],
    name: [this.data?.name, [Validators.required]],
    agency: [this.data?.agency],
    bank: [this.data?.bank],
    number: [this.data?.number],
    color: [this.data?.color],
  });

  public readonly isUpdateWalletDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

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
    private readonly _store: UpdateWalletModalStore,
    private readonly _formBuilder: FormBuilder,
    @Inject(PONE_DIALOG_DATA) private readonly data: WalletModel,
    dialogRef: DialogRef
  ) {
    this._store.setType(data.type);
    this._store.setDialogId(dialogRef.dialogId);
  }

  ngOnInit(): void {
    this._store.loadBanks();
  }

  updateWallet(): void {
    this._store.updateWallet(this.form.value);
  }
}
