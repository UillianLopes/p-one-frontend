import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidenavItemPaddingLeftAnimation = trigger(
  'sidenavItemPaddingLeftAnimation',
  [
    state('OPENED', style({ paddingLeft: '{{paddingLeft}}px' }), {
      params: { paddingLeft: 0 },
    }),
    state('CLOSED', style({ paddingLeft: '0px' })),

    transition('OPENED => CLOSED', animate('.2s linear')),
    transition('CLOSED => OPENED', animate('.2s linear')),
  ]
);
