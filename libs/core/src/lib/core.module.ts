import { CommonModule, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

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
  }): ModuleWithProviders<POneCoreModule> {
    return {
      ngModule: POneCoreModule,
      providers: [
        {
          provide: NgbDateAdapter,
          useClass: NgbCustomDateAdapter,
        },
        {
          provide: NgbDateParserFormatter,
          useFactory: () =>
            new LuxonDateFormatterParser(config.luxonDateFormat),
        },
        {
          provide: LOCALE_ID,
          useValue: config.locale,
        },
      ],
    };
  }
}
