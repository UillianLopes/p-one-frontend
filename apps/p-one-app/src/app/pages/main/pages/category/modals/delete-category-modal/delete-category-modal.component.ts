import { Component, Inject, OnInit } from '@angular/core';
import { PONE_DIALOG_DATA } from '@p-one/shared';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryFacade } from '../../+state/category.facade';

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
        ? [filtredCategories.find((c) => c.id === categoryId)].filter(
            (x) => !!x
          )
        : filtredAndSelectedCategories
    )
  );

  readonly toBeDeletedCategoriesNames$ = this.toBeDeleteCategories$.pipe(
    map((toBeDeleteCategories) => ({
      count: toBeDeleteCategories.length,
      categoryNames: toBeDeleteCategories.map(({ name }) => name).join(', '),
    }))
  );

  constructor(
    @Inject(PONE_DIALOG_DATA) private readonly cateogryId: string,
    private _facade: CategoryFacade
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
