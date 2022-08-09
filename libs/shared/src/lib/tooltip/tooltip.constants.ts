import { InjectionToken, TemplateRef } from '@angular/core';

export const TOOLTIP_TEMPLATE = new InjectionToken<TemplateRef<any>>(
  'TOOLTIP_TEMPLATE'
);
export const TOOLTIP_DATA = new InjectionToken<string>('TOOLTIP_DATA');
export const TOOLTIP_CONFIG = new InjectionToken<{ useTooltipStyle: boolean }>(
  'TOOLTIP_CONFIG'
);
