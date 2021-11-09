import { ComponentPortal } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';

export const PONE_DIALOG_OPTIONS = new InjectionToken('PONE_DIALOG_OPTIONS');
export const PONE_DIALOG_CONTENT = new InjectionToken<ComponentPortal<unknown>>(
  'PONE_DIALOG_CONTENT'
);

export const PONE_DIALOG_DATA = new InjectionToken('PONE_DIALOG_DATA');

export interface DialogOptions {
  minWidth: string;
  maxWidth?: string;
  hasBackdrop?: boolean;
}
