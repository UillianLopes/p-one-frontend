import { InjectionToken } from '@angular/core';

export interface Theme {
  '--bs-blue': string;
  '--bs-indigo': string;
  '--bs-purple': string;
  '--bs-pink': string;
  '--bs-red': string;
  '--bs-orange': string;
  '--bs-yellow': string;
  '--bs-green': string;
  '--bs-teal': string;
  '--bs-cyan': string;
  '--bs-black': string;
  '--bs-white': string;
  '--bs-gray': string;
  '--bs-gray-dark': string;
  '--bs-gray-100': string;
  '--bs-gray-200': string;
  '--bs-gray-300': string;
  '--bs-gray-400': string;
  '--bs-gray-500': string;
  '--bs-gray-600': string;
  '--bs-gray-700': string;
  '--bs-gray-800': string;
  '--bs-gray-900': string;
  '--bs-primary': string;
  '--bs-secondary': string;
  '--bs-success': string;
  '--bs-info': string;
  '--bs-warning': string;
  '--bs-danger': string;
  '--bs-light': string;
  '--bs-dark': string;
  '--bs-primary-rgb': string;
  '--bs-secondary-rgb': string;
  '--bs-success-rgb': string;
  '--bs-info-rgb': string;
  '--bs-warning-rgb': string;
  '--bs-danger-rgb': string;
  '--bs-light-rgb': string;
  '--bs-dark-rgb': string;
  '--bs-white-rgb': string;
  '--bs-black-rgb': string;
  '--bs-body-color-rgb': string;
  '--bs-body-bg-rgb': string;
  '--bs-body-color': string;
  '--bs-body-bg': string;
  '--bs-border-width': string;
  '--bs-border-style': string;
  '--bs-border-color': string;
  '--bs-border-color-translucent': string;
  '--bs-link-color': string;
  '--bs-link-hover-color': string;
  '--bs-code-color': string;
  '--bs-highlight-bg': string;

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
