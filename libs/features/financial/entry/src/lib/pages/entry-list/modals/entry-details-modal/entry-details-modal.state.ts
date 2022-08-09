import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OptionModel } from '@p-one/core';
import { EntryModel } from '@p-one/domain/financial';

export interface EntryDetailsModalState {
  isLoading: boolean;
  entry?: EntryModel;
  categories: OptionModel[];
  subCategories: OptionModel[];
}

@Injectable()
export class EntryDetailsModalStore extends ComponentStore<EntryDetailsModalState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly entry$ = this.select(({ entry }) => entry);

  public readonly categories$ = this.select(({ categories }) => categories);
  public readonly subCategories$ = this.select(
    ({ subCategories }) => subCategories
  );

  constructor() {
    super({ isLoading: false, categories: [], subCategories: [] });
  }

  public readonly setCategories = this.updater(
    (state, categories: OptionModel[]) => ({ ...state, categories })
  );

  public readonly setSubCategories = this.updater(
    (state, subCategories: OptionModel[]) => ({ ...state, subCategories })
  );

  public readonly setEntry = this.updater((state, entry: EntryModel) => ({
    ...state,
    entry,
  }));

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));
}
