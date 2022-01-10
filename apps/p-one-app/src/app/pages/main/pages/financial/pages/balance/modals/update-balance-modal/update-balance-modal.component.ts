import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BalanceModel, BankModel, EBalanceType } from '@p-one/core';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { UpdateBalanceModalStore } from './update-balance-modal.state';

@Component({
  selector: 'p-one-update-balance-modal',
  templateUrl: './update-balance-modal.component.html',
  styleUrls: ['./update-balance-modal.component.scss'],
  providers: [UpdateBalanceModalStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBalanceModalComponent implements OnInit {
  public readonly EBalanceType = EBalanceType;
  public readonly isLoading$ = this._store.isLoading$;
  public readonly type$ = this._store.type$;
  public readonly form = this._formBuilder.group({
    id: [this.data?.id, [Validators.required]],
    name: [this.data?.name, [Validators.required]],
    value: [this.data?.value, [Validators.required]],
    agency: [this.data?.agency],
    bank: [this.data?.bank],
    number: [this.data?.number],
  });

  public readonly isUpdateBalanceDisabled$ = this.form.statusChanges.pipe(
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
    private readonly _store: UpdateBalanceModalStore,
    private readonly _formBuilder: FormBuilder,
    @Inject(PONE_DIALOG_DATA) private readonly data: BalanceModel,
    dialogRef: DialogRef
  ) {
    this._store.setType(data.type);
    this._store.setDialogId(dialogRef.dialogId);
  }

  ngOnInit(): void {
    this._store.loadBanks();
  }

  updateBalance(): void {
    this._store.updateBalance(this.form.value);
  }
}
