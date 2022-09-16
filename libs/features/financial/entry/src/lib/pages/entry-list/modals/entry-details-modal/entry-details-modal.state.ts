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
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly entry$ = this.select(({ entry }) => entry);
  readonly categories$ = this.select(({ categories }) => categories);
  readonly subCategories$ = this.select(({ subCategories }) => subCategories);

  constructor() {
    super({ isLoading: false, categories: [], subCategories: [] });
  }

  readonly setCategories = this.updater((state, categories: OptionModel[]) => ({
    ...state,
    categories,
  }));

  readonly setSubCategories = this.updater(
    (state, subCategories: OptionModel[]) => ({ ...state, subCategories })
  );

  readonly setEntry = this.updater((state, entry: EntryModel) => ({
    ...state,
    entry,
  }));

  readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));
}
