import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CategoryModel, EEntryType } from '@p-one/financial';
import { DestroyableMixin, DialogService } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

import { CategoryFacade } from './+state/category.facade';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';
import { DeleteCategoryModalComponent } from './modals/delete-category-modal/delete-category-modal.component';
import { UpdateCategoryModalComponent } from './modals/update-category-modal/update-category-modal.component';

@Component({
  selector: 'p-one-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  public readonly EntryType = EEntryType;
  public readonly categories$ = this._facade.filtredPaginatedCategories$;
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isAllFiltredCategoriesSelected$ =
    this._facade.isAllFiltredCategoriesSelected$;
  public readonly isSomeButNotAllFiltredCategoriesSelected$ =
    this._facade.isSomeButNotAllFiltredCategoriesSelected$;

  public readonly isSomeFiltredCategoriesSelected$ =
    this._facade.isSomeFiltredCategoriesSelected$;

  public readonly filterControl = new UntypedFormControl('');

  public readonly page$ = this._facade.page$;
  public readonly pageSize$ = this._facade.pageSize$;
  public readonly filtredCategoriesLength$ =
    this._facade.filtredCategoriesLength$;

  constructor(
    private readonly _facade: CategoryFacade,
    private readonly _dialogService: DialogService
  ) {
    super();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._facade.resetState();
  }

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this._facade.filterCategories({
          text: value,
        });
      });

    this._facade.loadCategories();
  }

  toggleSelectMultipleCategories(): void {
    this._facade.toggleSelectMultipleCategories();
  }

  toggleCategory(categoryId: string): void {
    this._facade.toggleCategory(categoryId);
  }

  openCreateCategoryDialog(): void {
    const { dialogId } = this._dialogService.open(
      CreateCategoryModalComponent,
      {
        minWidth: '600px',
      }
    );

    this._facade.setOpenedCreateCategoryDialog(dialogId);
  }

  openUpdateUpdateCategoryDialog(category: CategoryModel): void {
    const { dialogId } = this._dialogService.open(
      UpdateCategoryModalComponent,
      {
        minWidth: '600px',
      },
      category
    );

    this._facade.setOpenedUpdateCategoryDialog(dialogId);
  }

  openDeleteCategoryDialog(categoryId?: string): void {
    const { dialogId } = this._dialogService.open(
      DeleteCategoryModalComponent,
      { minWidth: '400px', maxWidth: '400px' },
      categoryId
    );

    this._facade.setOpenedDeleteCategoryDialog(dialogId);
  }

  setCategoriesPage(page: number): void {
    this._facade.setCategoriesPage(page);
  }
}
