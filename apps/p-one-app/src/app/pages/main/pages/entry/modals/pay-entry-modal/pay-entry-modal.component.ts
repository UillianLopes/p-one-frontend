import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EEntryType, EntryModel, WalletModel } from '@p-one/core';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { PayEntryModalStore } from './pay-entry-modal.state';

@Component({
  selector: 'p-one-pay-entry-modal',
  templateUrl: './pay-entry-modal.component.html',
  styleUrls: ['./pay-entry-modal.component.scss'],
  providers: [PayEntryModalStore],
})
export class PayEntryModalComponent implements OnInit {
  public readonly EntryType = EEntryType;
  public readonly isLoading$ = this._store.isLoading$;
  public readonly balances$ = this._store.balances$;
  public readonly entry$ = this._store.entry$;
  public readonly type$ = this._store.type$;

  public readonly balance$ = this._store.balance$;

  public readonly form = this._formBuilder.group({
    fees: [0.0],
    fine: [0.0],
    value: [this.entry.value, [Validators.max(this.entry.value)]],
  });

  public readonly paymentValue = this.form.get('value');
  public readonly paymentFine = this.form.get('fine');
  public readonly paymentFees = this.form.get('fees');

  public readonly paymentValue$ = this.paymentValue.valueChanges.pipe(
    startWith(this.paymentValue.value)
  );

  public readonly paymentFine$ = this.paymentFine.valueChanges.pipe(
    startWith(this.paymentFine.value)
  );

  public readonly paymentFees$ = this.paymentFees.valueChanges.pipe(
    startWith(this.paymentFees.value)
  );

  public readonly paymentRealValue$ = combineLatest([
    this.paymentFees$,
    this.paymentFine$,
    this.paymentValue$,
  ]).pipe(map(([fees, fine, value]) => value + fine + fees));

  constructor(
    private readonly _store: PayEntryModalStore,
    @Inject(PONE_DIALOG_DATA) public readonly entry: EntryModel,
    private readonly _formBuilder: FormBuilder,
    private readonly _dialogRef: DialogRef
  ) {
    this._store.setDialogId(_dialogRef.dialogId);
    this._store.setEntry(entry);
  }

  ngOnInit(): void {
    this._store.loadBalances();
  }

  public setBalance(balance: WalletModel) {
    this._store.setBalance(balance);
  }

  public payEntry(): void {
    this._store.payEntry(this.form.value);
  }

  public readonly displayBalanceFn = (balance: WalletModel) => balance?.name;
}
