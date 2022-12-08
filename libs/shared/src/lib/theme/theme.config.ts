import { InjectionToken } from '@angular/core';

export interface Theme {
  [key: string]: string;
}

export interface ThemeConfig {
  default: string;
  themes: {
    dark: Partial<Theme>;
    light: Partial<Theme>;
    [key: string]: Partial<Theme>;
  };
}

export const THEME_CONFIG = new InjectionToken<ThemeConfig>('THEME_CONFIG');
