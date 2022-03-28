import { Component, Inject, OnInit } from '@angular/core';
import { PONE_DIALOG_DATA } from '@p-one/shared';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SubCategoryFacade } from '../../+state/sub-category.facade';

@Component({
  selector: 'p-one-delete-sub-category-modal',
  templateUrl: './delete-sub-category-modal.component.html',
  styleUrls: ['./delete-sub-category-modal.component.scss'],
})
export class DeleteSubCategoryModalComponent implements OnInit {
  readonly isLoading$ = this._facade.isLoading$;
  readonly toBeDeleteSubCategories$ = combineLatest([
    this._facade.filtredSelectedSubCategories$,
    this._facade.filtredSubCategories$,
    of(this.subCategoryId),
  ]).pipe(
    map(([filtredAndSelectedCategories, filtredCategories, categoryId]) =>
      categoryId
        ? [filtredCategories.find((c) => c.id == categoryId)].filter((x) => !!x)
        : filtredAndSelectedCategories
    )
  );

  readonly toBeDeletedSubCategoriesNames$ = this.toBeDeleteSubCategories$.pipe(
    map((toBeDeleteCategories) => toBeDeleteCategories.map((c) => c.name))
  );

  readonly willMoreThanOneSubCategoryBeDeleted$ =
    this.toBeDeleteSubCategories$.pipe(
      map((toBeDeleteCategories) => toBeDeleteCategories.length > 1)
    );

  readonly willOnlyOneSubCategoryBeDeleted$ =
    this.willMoreThanOneSubCategoryBeDeleted$.pipe(
      map(
        (willMoreThanOneCategoryBeDeleted) => !willMoreThanOneCategoryBeDeleted
      )
    );

  constructor(
    @Inject(PONE_DIALOG_DATA) private readonly subCategoryId: string,
    private readonly _facade: SubCategoryFacade
  ) {}

  ngOnInit(): void {}

  deleteSubCategory(): void {
    if (this.subCategoryId) {
      this._facade.deleteSubCategory(this.subCategoryId);
      return;
    }

    this._facade.deleteSelectedSubCategories();
  }
}
