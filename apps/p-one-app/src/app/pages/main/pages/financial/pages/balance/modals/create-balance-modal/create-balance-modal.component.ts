import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { DialogRef } from '../../../../../../../../../../../../libs/shared/src';
import { CreateBalanceModalStore, ECreateBalanceModalMode } from './create-balance-modal.state';

@Component({
  selector: 'p-one-create-balance-modal',
  templateUrl: './create-balance-modal.component.html',
  styleUrls: ['./create-balance-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateBalanceModalStore],
})
export class CreateBalanceModalComponent implements OnInit {
  public readonly ECreateBalanceModalMode = ECreateBalanceModalMode;

  public readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    value: [0.0, [Validators.required]],
    agency: [],
    instituition: [],
    number: [],
  });

  public readonly isCreateBalanceEnabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((state) => state === 'VALID')
  );

  public readonly isLoading$ = this._store.isLoading$;
  public readonly mode$ = this._store.mode$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: CreateBalanceModalStore,
    dialogRef: DialogRef
  ) {
    this._store.setDialogId(dialogRef.dialogId);
  }

  ngOnInit(): void {}

  public createBalance(): void {
    this._store.createBalance(this.form.value);
  }

  public setMode(mode: ECreateBalanceModalMode) {
    this._store.setMode(mode);
  }
}
