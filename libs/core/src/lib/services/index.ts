import { Provider } from '@angular/core';

import { BankService, CategoryService, EntryService, SubCategoryService, WalletService } from './financial';

export * from './financial';

export const SERVICES_PROVIDERS: Provider[] = [
  EntryService,
  CategoryService,
  SubCategoryService,
  WalletService,
  BankService,
];
