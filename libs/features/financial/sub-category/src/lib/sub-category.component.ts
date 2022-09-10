import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { EEntryOperation, SubCategoryModel } from '@p-one/domain/financial';
import { DestroyableMixin, DialogService } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

import { SubCategoryFacade } from './+state/sub-category.facade';
import { CreateSubCategoryModalComponent } from './modals/create-sub-category-modal/create-sub-category-modal.component';
import { DeleteSubCategoryModalComponent } from './modals/delete-sub-category-modal/delete-sub-category-modal.component';
import { UpdateSubCategoryModalComponent } from './modals/update-sub-category-modal/update-sub-category-modal.component';

@Component({
  selector: 'p-one-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent extends DestroyableMixin() implements OnInit {
  public readonly EntryType = EEntryOperation;
  public readonly categories$ = this._facade.filtredPaginatedSubCategories$;
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isAllFiltredSubCategoriesSelected$ =
    this._facade.isAllFiltredSubCategoriesSelected$;
  public readonly isSomeButNotAllFiltredCategoriesSelected$ =
    this._facade.isSomeButNotAllFiltredSubCategoriesSelected$;

  public readonly isSomeFiltredSubCategoriesSelected$ =
    this._facade.isSomeFiltredSubCategoriesSelected$;

  public readonly filterControl = new UntypedFormControl('');

  public readonly page$ = this._facade.page$;
  public readonly pageSize$ = this._facade.pageSize$;
  public readonly filtredSubCategoriesLength$ =
    this._facade.filtredSubCategoriesLength$;

  public readonly trackBySubCategoryId = (
    index: number,
    category: SubCategoryModel
  ) => category.id;

  constructor(
    private readonly _facade: SubCategoryFacade,
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
        this._facade.filterSubCategories({
          text: value,
        });
      });

    this._facade.loadSubCategories();
  }

  toggleSelectMultipleCategories(): void {
    this._facade.toggleSelectMultipleSubCategories();
  }

  toggleSubCategory(categoryId: string): void {
    this._facade.toggleSubCategory(categoryId);
  }

  openCreateCategoryDialog(): void {
    const { dialogId } = this._dialogService.open(
      CreateSubCategoryModalComponent,
      {
        minWidth: '600px',
      }
    );

    this._facade.setOpenedCreateSubCategoryDialog(dialogId);
  }

  openUpdateUpdateCategoryDialog(category: SubCategoryModel): void {
    const { dialogId } = this._dialogService.open(
      UpdateSubCategoryModalComponent,
      {
        minWidth: '600px',
      },
      category
    );

    this._facade.setOpenedUpdateSubCategoryDialog(dialogId);
  }

  openDeleteCategoryDialog(categoryId?: string): void {
    const { dialogId } = this._dialogService.open(
      DeleteSubCategoryModalComponent,
      { minWidth: '400px', maxWidth: '400px' },
      categoryId
    );

    this._facade.setOpenedDeleteSubCategoryDialog(dialogId);
  }

  setCategoriesPage(page: number): void {
    this._facade.setSubCategoriesPage(page);
  }
}
