import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { generateColor } from '@p-one/core';
import { CategoryModel, EEntryOperation } from '@p-one/domain/financial';
import { CustomValidators, DestroyableMixin } from '@p-one/shared';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

import { SubCategoryFacade } from '../../+state/sub-category.facade';

@Component({
  selector: 'p-one-create-sub-category-modal',
  templateUrl: './create-sub-category-modal.component.html',
  styleUrls: ['./create-sub-category-modal.component.scss'],
})
export class CreateSubCategoryModalComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  readonly EntryType = EEntryOperation;
  readonly form = this._formBuilder.group({
    name: ['', [Validators.required]],
    type: [EEntryOperation.Credit, Validators.required],
    category: [null, [CustomValidators.requireToBeObject]],
    description: [''],
    color: [generateColor()],
  });

  readonly isCreateSubCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  readonly isLoading$ = this._facade.isLoading$;
  readonly categories$ = this._facade.categories$;
  readonly displayFn = (obj: CategoryModel) => obj.name;

  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _facade: SubCategoryFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this._facade.loadCategories();

    this.form
      .get('category')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        filter((value) => !value || typeof value == 'string')
      )
      .subscribe((value) => {
        this._facade.setCategoriesFilter(value);
      });
  }

  ngOnDestroy(): void {
    this._facade.resetCategories();
  }

  createSubCategory(): void {
    const { name, description, category, color } = this.form.value;
    this._facade.createSubCategory({
      name,
      description,
      categoryId: category.id,
      color,
    });
  }
}
