import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryModel } from '@p-one/core';
import { PONE_DIALOG_DATA } from '@p-one/shared';
import { map, startWith } from 'rxjs/operators';

import { SubCategoryFacade } from '../../+state/sub-category.facade';

@Component({
  selector: 'p-one-update-sub-category-modal',
  templateUrl: './update-sub-category-modal.component.html',
  styleUrls: ['./update-sub-category-modal.component.scss'],
})
export class UpdateSubCategoryModalComponent implements OnInit {
  readonly form = this._formBuilder.group({
    id: [this._category.id, Validators.required],
    name: [this._category.name, [Validators.required]],
    description: [this._category.description],
  });

  readonly isCreateSubCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  readonly isLoading$ = this._facade.isLoading$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _facade: SubCategoryFacade,
    @Inject(PONE_DIALOG_DATA) private readonly _category: CategoryModel
  ) {}

  ngOnInit(): void {}

  updateSubCategory(): void {
    this._facade.updateSubCategory(this.form.value);
  }
}
