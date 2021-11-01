import { Provider } from '@angular/core';

import { CategoryService, EntryService } from './financial';

export * from './financial';

export const SERVICES_PROVIDERS: Provider[] = [EntryService, CategoryService];
