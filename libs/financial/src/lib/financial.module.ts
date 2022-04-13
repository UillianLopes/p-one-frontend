import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FINANCIAL_ENDPOINT } from './contants';
import { SERVICE_PROVIDERS } from './services';

@NgModule({
  imports: [CommonModule],
})
export class POneFinancialModule {
  static forRoot(config: {
    endpoint: string;
  }): ModuleWithProviders<POneFinancialModule> {
    return {
      ngModule: POneFinancialModule,
      providers: [
        {
          provide: FINANCIAL_ENDPOINT,
          useValue: config.endpoint,
        },
        ...SERVICE_PROVIDERS,
      ],
    };
  }
}
