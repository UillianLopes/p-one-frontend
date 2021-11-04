import { InjectionToken, TemplateRef } from '@angular/core';

export const CONTEXT_MENU_TEMPLATE = new InjectionToken<TemplateRef<any>>(
  'CONTEXT_MENU_TEMPLATE'
);
