import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryModel, EntryType, SubCategoryModel } from '@p-one/core';
import { CustomValidators, DestroyableMixin, PONE_DIALOG_DATA } from '@p-one/shared';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';

import { SubCategoryFacade } from '../../+state/sub-category.facade';

@Component({
  selector: 'p-one-update-sub-category-modal',
  templateUrl: './update-sub-category-modal.component.html',
  styleUrls: ['./update-sub-category-modal.component.scss'],
})
export class UpdateSubCategoryModalComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  
  readonly form = this._formBuilder.group({
    id: [this._subCategory.id, Validators.required],
    name: [this._subCategory.name, [Validators.required]],
    type: [EntryType.Credit, Validators.required],
    category: [
      this._subCategory.category,
      [CustomValidators.requireToBeObject],
    ],
    description: [this._subCategory.description],
  });

  readonly isCreateSubCategoryDisabled$ = this.form.statusChanges.pipe(
    startWith(this.form.status),
    map((status) => status === 'INVALID')
  );

  readonly isLoading$ = this._facade.isLoading$;
  readonly categories$ = this._facade.categories$;
  readonly displayFn = (obj: CategoryModel) => obj.name;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _facade: SubCategoryFacade,
    @Inject(PONE_DIALOG_DATA) private readonly _subCategory: SubCategoryModel
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

  updateSubCategory(): void {
    const { id, name, description, category } = this.form.value;
    this._facade.updateSubCategory({
      id,
      name,
      description,
      categoryId: category.id,
    });
  }
}
