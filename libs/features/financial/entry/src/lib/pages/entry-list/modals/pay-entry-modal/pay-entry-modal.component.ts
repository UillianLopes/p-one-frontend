import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { EEntryOperation, EntryModel, WalletModel } from '@p-one/domain/financial';
import {
  CustomValidators,
  DestroyableMixin,
  DialogRef,
  PONE_DIALOG_DATA,
  updateValueAndValidityMarkingControlsAreDirty,
} from '@p-one/shared';
import { combineLatest } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

import { PayEntryModalStore } from './pay-entry-modal.state';

@Component({
  selector: 'p-one-pay-entry-modal',
  templateUrl: './pay-entry-modal.component.html',
  styleUrls: ['./pay-entry-modal.component.scss'],
  providers: [PayEntryModalStore],
})
export class PayEntryModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  readonly EntryType = EEntryOperation;
  readonly isLoading$ = this._store.isLoading$;
  readonly balances$ = this._store.wallets$;
  readonly entry$ = this._store.entry$;
  readonly type$ = this._store.type$;

  readonly balance$ = this._store.wallet$;

  readonly form = this._formBuilder.group({
    wallet: [null, [Validators.required, CustomValidators.requireToBeObject]],
    fees: [0.0],
    fine: [0.0],
    value: [
      this.entry.value,
      [Validators.min(0.01), Validators.max(this.entry.value)],
    ],
    newValue: [{ disabled: !!this.entry.id, value: this.entry.value }],
    dueDate: [{ disabled: true, value: this.entry.dueDate }],
  });

  readonly paymentValue = this.form.get('value') as FormControl;
  readonly paymentFine = this.form.get('fine') as FormControl;
  readonly paymentFees = this.form.get('fees') as FormControl;
  readonly entryNewValue = this.form.get('newValue') as FormControl;
  readonly paymentValue$ = this.paymentValue.valueChanges.pipe(
    startWith(this.paymentValue.value)
  );
  readonly paymentFine$ = this.paymentFine.valueChanges.pipe(
    startWith(this.paymentFine.value)
  );
  readonly paymentFees$ = this.paymentFees.valueChanges.pipe(
    startWith(this.paymentFees.value)
  );
  readonly entryNewValue$ = this.entryNewValue.valueChanges;
  readonly paymentRealValue$ = combineLatest([
    this.paymentFees$,
    this.paymentFine$,
    this.paymentValue$,
  ]).pipe(map(([fees, fine, value]) => value + fine + fees));

  readonly canDefineEntryValue$ = this._store.canDefineEntryValue$;
  readonly displayBalanceFn = (balance: WalletModel) => balance?.name;

  constructor(
    private readonly _store: PayEntryModalStore,
    @Inject(PONE_DIALOG_DATA) readonly entry: EntryModel,
    private readonly _formBuilder: UntypedFormBuilder,
    dialogRef: DialogRef
  ) {
    super();
    this._store.setDialogId(dialogRef.dialogId);
    this._store.setEntry(entry);
  }

  ngOnInit(): void {
    this._store.loadWallets();
    this.entryNewValue$
      .pipe(takeUntil(this.destroyed$), debounceTime(300))
      .subscribe((value) => {
        this.paymentValue.setValidators([
          Validators.min(0.01),
          Validators.max(value),
        ]);
        this.paymentValue.setValue(value);
        this.paymentValue.updateValueAndValidity();
      });
  }

  setWallet(wallet: WalletModel) {
    this._store.setWallet(wallet);
  }

  payEntry(): void {
    if (this.form.invalid) {
      updateValueAndValidityMarkingControlsAreDirty(this.form);
      return;
    }

    this._store.payEntry(this.form.value);
  }
}
