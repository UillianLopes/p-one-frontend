import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EEntryType } from '@p-one/financial';
import { map, startWith } from 'rxjs/operators';

import { CategoryFacade } from '../../+state/category.facade';

@Component({
  selector: 'p-one-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent implements OnInit {
  public readonly EntryType = EEntryType;
  public readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    type: [EEntryType.Credit, [Validators.required]],
    description: [''],
    color: ['#ffffff', [Validators.required]],
  });

  public readonly isCreateCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  public readonly isLoading$ = this._facade.isLoading$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _facade: CategoryFacade
  ) {}

  ngOnInit(): void {}

  createCategory(): void {
    this._facade.createCategory(this.form.value);
  }
}
