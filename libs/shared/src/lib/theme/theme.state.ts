import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { ThemeConfig } from './theme.config';

export interface ThemeState {
  theme: string | null;
  themeConfig: ThemeConfig | null;
}

@Injectable()
export class ThemeStore extends ComponentStore<ThemeState> {
  public readonly theme$ = this.select(({ theme, themeConfig }) => {
    if (!themeConfig) {
      return null;
    }

    return themeConfig.themes[theme || themeConfig.default];
  });

  constructor() {
    super({
      theme: null,
      themeConfig: null,
    });
  }

  public readonly setTheme = this.updater((state, theme: string) => ({
    ...state,
    theme,
  }));

  public readonly setThemeConfig = this.updater(
    (state, themeConfig: ThemeConfig | null) => ({ ...state, themeConfig })
  );
}
