import { Provider } from '@angular/core';

import { BalanceService, BankService, CategoryService, EntryService, SubCategoryService } from './financial';

export * from './financial';

export const SERVICES_PROVIDERS: Provider[] = [
  EntryService,
  CategoryService,
  SubCategoryService,
  BalanceService,
  BankService,
];
