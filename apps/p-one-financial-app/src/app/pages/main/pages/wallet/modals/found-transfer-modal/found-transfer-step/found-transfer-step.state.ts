import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CategoryModel, SubCategoryModel, SubCategoryService, WalletModel } from '@p-one/financial';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface FoundTransferStepState {
  categories?: CategoryModel[];
  subCategories?: SubCategoryModel[];
  wallets?: WalletModel[];
  isWalletDisabled?: boolean;
}

@Injectable()
export class FoundTransferStepStore extends ComponentStore<FoundTransferStepState> {
  public readonly wallets$ = this.select(({ wallets }) => wallets);
  public readonly subCategories$ = this.select(
    ({ subCategories }) => subCategories
  );
  public readonly categories$ = this.select(({ categories }) => categories);
  public readonly isWalletDisabled$ = this.select(
    ({ isWalletDisabled }) => isWalletDisabled
  );

  public readonly t: any;

  constructor(private readonly _subCategoryService: SubCategoryService) {
    super({});
  }

  public readonly setWallets = this.updater(
    (state, wallets: WalletModel[]) => ({ ...state, wallets })
  );

  public readonly setCategories = this.updater(
    (state, categories: CategoryModel[]) => ({ ...state, categories })
  );

  public readonly setSubCategories = this.updater(
    (state, subCategories: SubCategoryModel[]) => ({ ...state, subCategories })
  );

  public readonly setIsWalletDisabled = this.updater(
    (state, isWalletDisabled: boolean) => ({ ...state, isWalletDisabled })
  );

  public readonly loadSubCategories = this.effect(
    (event$: Observable<string>) =>
      event$.pipe(
        switchMap((categoryId) =>
          this._subCategoryService.get(categoryId).pipe(
            tap({
              next: (subCategories) => this.setSubCategories(subCategories),
            })
          )
        )
      )
  );
}
