import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { CategoryModel, EEntryOperation } from '@p-one/domain/financial';
import { PONE_DIALOG_DATA } from '@p-one/shared';
import { map, startWith } from 'rxjs/operators';

import { CategoryFacade } from '../../+state/category.facade';

@Component({
  selector: 'p-one-update-category-modal',
  templateUrl: './update-category-modal.component.html',
  styleUrls: ['./update-category-modal.component.scss'],
})
export class UpdateCategoryModalComponent implements OnInit {
  readonly EntryType = EEntryOperation;
  readonly form = this._formBuilder.group({
    id: [this._category.id, Validators.required],
    name: [this._category.name, [Validators.required]],
    type: [this._category.type, [Validators.required]],
    description: [this._category.description],
    color: [this._category.color],
  });

  readonly isCreateCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  readonly isLoading$ = this._facade.isLoading$;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: CategoryFacade,
    @Inject(PONE_DIALOG_DATA) private readonly _category: CategoryModel
  ) {}

  ngOnInit(): void {}

  updateCategory(): void {
    this._facade.updateCategory(this.form.value);
  }
}
