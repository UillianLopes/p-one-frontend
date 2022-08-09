import { InjectionToken, TemplateRef } from '@angular/core';

export interface ToastOptions {
  duration: number;
  color:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'dark'
    | 'light'
    | 'black'
    | 'white';
}

export const TOAST_OPTIONS = new InjectionToken<ToastOptions>('TOAST_OPTIONS');
export const TOAST_TEMPLATE = new InjectionToken<TemplateRef<any>>(
  'TOAST_TEMPLATE'
);
export const TOAST_TEXT = new InjectionToken<string>('TOAST_TEXT');
export const TOAST_TEXTS = new InjectionToken<string[]>('TOAST_TEXTS');
