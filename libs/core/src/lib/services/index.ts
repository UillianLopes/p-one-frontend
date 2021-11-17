import { Provider } from '@angular/core';

import { CategoryService, EntryService, SubCategoryService } from './financial';

export * from './financial';

export const SERVICES_PROVIDERS: Provider[] = [
  EntryService,
  CategoryService,
  SubCategoryService,
];
