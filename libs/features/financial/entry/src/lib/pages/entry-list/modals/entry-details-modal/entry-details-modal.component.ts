import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { OptionModel } from '@p-one/core';
import { EntryModel } from '@p-one/domain/financial';
import { CustomValidators, DestroyableMixin, PONE_DIALOG_DATA } from '@p-one/shared';
import { skip, takeUntil } from 'rxjs';

import { EntryDetailsModalStore } from './entry-details-modal.state';

@Component({
  selector: 'p-one-entry-details-modal',
  templateUrl: './entry-details-modal.component.html',
  styleUrls: ['./entry-details-modal.component.scss'],
  providers: [EntryDetailsModalStore],
})
export class EntryDetailsModalComponent
  extends DestroyableMixin()
  implements OnInit
{
  @Input()
  set entry(entry: EntryModel) {
    this._store.setEntryAndLoad(entry);
  }

  public readonly form = this._formBuilder.group({
    value: [0.0, [Validators.required]],
    fees: [null],
    fine: [null],
    title: [null, [Validators.required]],
    dueDate: [null, [Validators.required]],
    description: [null],
    category: [null, [Validators.required, CustomValidators.requireToBeObject]],
    subCategory: [null, [CustomValidators.requireToBeObject]],
    barCode: [null],
    currency: [null, [Validators.required]],
  });

  public readonly categories$ = this._store.categories$;
  public readonly subCategories$ = this._store.subCategories$;
  public readonly isNotPaid$ = this._store.isNotPaid$;
  public readonly isLoading$ = this._store.isLoading$;
  public readonly updated$ = this._store.updated$;
  public displayFn = (option: OptionModel) => option.title;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _store: EntryDetailsModalStore,
    @Inject(PONE_DIALOG_DATA) entry: EntryModel
  ) {
    super();
    this._store.setEntryAndLoad(entry);
  }

  ngOnInit(): void {
    this._store.entry$
      .pipe(takeUntil(this.destroyed$), skip(1))
      .subscribe((entry) => {
        this.form.patchValue(entry ?? {});
      });
  }

  updateEntry(): void {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this._store.updateEntry(this.form.value);
  }
}
