import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { THEME_CONFIG, ThemeConfig } from './theme.config';
import { ThemeDirective } from './theme.directive';

@NgModule({
  declarations: [ThemeDirective],
  imports: [CommonModule],
  exports: [ThemeDirective],
})
export class ThemeModule {
  static forRoot(config: ThemeConfig): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEME_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
