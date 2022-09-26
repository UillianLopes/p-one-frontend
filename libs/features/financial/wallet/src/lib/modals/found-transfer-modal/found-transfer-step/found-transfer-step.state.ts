import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import { SubCategoryService, WalletOptionModel } from '@p-one/domain/financial';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface FoundTransferStepState {
  categories?: OptionModel[];
  subCategories?: OptionModel[];
  wallets?: WalletOptionModel[];
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

  constructor(private readonly _subCategoryService: SubCategoryService) {
    super({});
  }

  public readonly setWallets = this.updater(
    (state, wallets: WalletOptionModel[]) => ({ ...state, wallets })
  );

  public readonly setCategories = this.updater(
    (state, categories: OptionModel[]) => ({ ...state, categories })
  );

  public readonly setIsWalletDisabled = this.updater(
    (state, isWalletDisabled: boolean) => ({ ...state, isWalletDisabled })
  );

  public readonly loadSubCategories = this.effect(
    (event$: Observable<string>) =>
      event$.pipe(
        switchMap((categoryId) =>
          this._subCategoryService.getAllAsOptions(categoryId).pipe(
            tap({
              next: (subCategories) => this.patchState({ subCategories }),
            })
          )
        )
      )
  );
}
