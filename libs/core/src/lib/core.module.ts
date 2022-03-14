import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { FINANCIAL_API_URL } from './contants/tokens';
import { SERVICES_PROVIDERS } from './services';
import { LuxonDateFormatterParser } from './utils/luxon-date-formatter-parser';
import { NgbCustomDateAdapter } from './utils/ngb-custom-date-adapter';

registerLocaleData(localePt);
registerLocaleData(localeEn);

@NgModule({
  imports: [CommonModule, HammerModule],
})
export class POneCoreModule {
  static forRoot(config: {
    locale: string;
    luxonDateFormat: string;
    financialApiUrl?: string;
  }): ModuleWithProviders<POneCoreModule> {
    return {
      ngModule: POneCoreModule,
      providers: [
        {
          provide: LOCALE_ID,
          useValue: config.locale,
        },
        {
          provide: FINANCIAL_API_URL,
          useValue: config.financialApiUrl,
        },
        {
          provide: NgbDateAdapter,
          useClass: NgbCustomDateAdapter,
        },
        {
          provide: NgbDateParserFormatter,
          useFactory: () =>
            new LuxonDateFormatterParser(config.luxonDateFormat),
        },
        ...SERVICES_PROVIDERS,
      ],
    };
  }
}
