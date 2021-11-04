import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryModel } from '@p-one/core';
import { DialogService } from '@p-one/shared';
import { Subject } from 'rxjs';

import { CategoryListFacade } from './+state/category-list.facade';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';
import { UpdateCategoryModalComponent } from './modals/update-category-modal/update-category-modal.component';

@Component({
  selector: 'p-one-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public readonly categories$ = this._facade.filtredPaginatedCategories$;
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isAllFiltredCategoriesSelected$ =
    this._facade.isAllFiltredCategoriesSelected$;
  public readonly isSomeButNotAllFiltredCategoriesSelected$ =
    this._facade.isSomeButNotAllFiltredCategoriesSelected$;

  public readonly isSomeFiltredCategoriesSelected$ =
    this._facade.isSomeFiltredCategoriesSelected$;

  isIndeterminated$ = new Subject<boolean>();

  constructor(
    private readonly _facade: CategoryListFacade,
    private readonly _dialogService: DialogService
  ) {}

  ngOnDestroy(): void {
    this._facade.resetState();
  }

  ngOnInit(): void {
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

  markAsIndeterminated(): void {
    this.isIndeterminated$.next(true);
  }
}
