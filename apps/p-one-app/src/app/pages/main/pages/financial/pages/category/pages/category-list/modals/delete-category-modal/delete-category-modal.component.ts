import { Component, Inject, OnInit } from '@angular/core';
import { PONE_DIALOG_DATA } from '@p-one/shared';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryListFacade } from '../../+state/category-list.facade';

@Component({
  selector: 'p-one-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss'],
})
export class DeleteCategoryModalComponent implements OnInit {
  readonly isLoading$ = this._facade.isLoading$;
  readonly toBeDeleteCategories$ = combineLatest([
    this._facade.filtredSelectedCategories$,
    this._facade.filtredCategories$,
    of(this.cateogryId),
  ]).pipe(
    map(([filtredAndSelectedCategories, filtredCategories, categoryId]) =>
      categoryId
        ? [filtredCategories.find((c) => c.id == categoryId)].filter((x) => !!x)
        : filtredAndSelectedCategories
    )
  );

  readonly toBeDeletedCategoriesNames$ = this.toBeDeleteCategories$.pipe(
    map((toBeDeleteCategories) => toBeDeleteCategories.map((c) => c.name))
  );

  readonly willMoreThanOneCategoryBeDeleted$ = this.toBeDeleteCategories$.pipe(
    map((toBeDeleteCategories) => toBeDeleteCategories.length > 1)
  );

  readonly willOnlyOneCategoryBeDeleted$ =
    this.willMoreThanOneCategoryBeDeleted$.pipe(
      map(
        (willMoreThanOneCategoryBeDeleted) => !willMoreThanOneCategoryBeDeleted
      )
    );

  constructor(
    @Inject(PONE_DIALOG_DATA) private readonly cateogryId: string,
    private _facade: CategoryListFacade
  ) {}

  ngOnInit(): void {}

  deleteCategory(): void {
    if (this.cateogryId) {
      this._facade.deleteCategory(this.cateogryId);
      return;
    }

    this._facade.deleteSelectedCategories();
  }
}
