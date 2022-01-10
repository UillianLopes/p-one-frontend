import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankModel, EBalanceType } from '@p-one/core';
import { DialogRef } from '@p-one/shared';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { CreateBalanceModalStore } from './create-balance-modal.state';

@Component({
  selector: 'p-one-create-balance-modal',
  templateUrl: './create-balance-modal.component.html',
  styleUrls: ['./create-balance-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateBalanceModalStore],
})
export class CreateBalanceModalComponent implements OnInit {
  public readonly EBalanceType = EBalanceType;
  public readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    value: [0.0, [Validators.required]],
    agency: [],
    bank: [],
    number: [],
  });

  public readonly isCreateBalanceDisabled$ = this.form.statusChanges.pipe(
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
    private readonly _formBuilder: FormBuilder,
    private readonly _store: CreateBalanceModalStore,
    dialogRef: DialogRef
  ) {
    this._store.setDialogId(dialogRef.dialogId);
  }

  public ngOnInit(): void {
    this._store.loadBanks();
  }

  public createBalance(): void {
    this._store.createBalance(this.form.value);
  }

  public setMode(mode: EBalanceType) {
    this._store.setMode(mode);
  }
}
