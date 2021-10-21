import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidenavWidthAnimation = trigger('sidenavWidthAnimation', [
  state('OPENED', style({ width: '*' })),
  state('CLOSED', style({ width: '50px' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);

export const sidenavHeaderAnimation = trigger('sidenavHeaderAnimation', [
  state(
    'OPENED',
    style({
      height: '{{sidenavHeaderHeight}}px',
      opacity: '1',
    }),
    {
      params: { sidenavHeaderHeight: 0 },
    }
  ),
  state('CLOSED', style({ height: '0px', opacity: '0' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);
