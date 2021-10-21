import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidenavContainerContentPaddingAnimation = trigger(
  'sidenavContainerContentPaddingAnimation',
  [
    state('OPENED', style({ 'padding-left': '{{sidenavWidth}}px' }), {
      params: { sidenavWidth: '50' },
    }),
    state('CLOSED', style({ 'padding-left': '50px' })),

    transition('OPENED => CLOSED', animate('.2s linear')),
    transition('CLOSED => OPENED', animate('.2s linear')),
  ]
);
