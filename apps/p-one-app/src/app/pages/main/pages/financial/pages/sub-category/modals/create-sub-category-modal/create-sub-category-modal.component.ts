import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { SubCategoryFacade } from '../../+state/sub-category.facade';

@Component({
  selector: 'p-one-create-sub-category-modal',
  templateUrl: './create-sub-category-modal.component.html',
  styleUrls: ['./create-sub-category-modal.component.scss'],
})
export class CreateSubCategoryModalComponent implements OnInit {
  readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
  });

  readonly isCreateSubCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  readonly isLoading$ = this._facade.isLoading$;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _facade: SubCategoryFacade
  ) {}

  ngOnInit(): void {}

  createSubCategory(): void {
    this._facade.createSubCategory(this.form.value);
  }
}
