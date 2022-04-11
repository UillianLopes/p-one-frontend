import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TOKEN_REQUIRED_URLS } from '@p-one/identity';

import { FINANCIAL_API_URL } from './contants';
import { SERVICE_PROVIDERS } from './services';

@NgModule({
  imports: [CommonModule],
})
export class POneFinancialModule {
  static forRoot(config: {
    financialApiUrl: string;
  }): ModuleWithProviders<POneFinancialModule> {
    return {
      ngModule: POneFinancialModule,
      providers: [
        {
          provide: FINANCIAL_API_URL,
          useValue: config.financialApiUrl,
        },
        {
          provide: TOKEN_REQUIRED_URLS,
          useValue: [config.financialApiUrl],
        },
        ...SERVICE_PROVIDERS,
      ],
    };
  }
}
