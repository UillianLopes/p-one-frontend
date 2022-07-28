import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidenavWidthAnimation = trigger('sidenavWidthAnimation', [
  state(
    '*',
    style({
      width: '40px',
    })
  ),

  state('OPENED', style({ width: '240px' })),
  state('CLOSED', style({ width: '40px' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);

export const sidenavHeaderAnimation = trigger('sidenavHeaderAnimation', [
  state(
    '*',
    style({
      height: '0px',
      opacity: '0',
    })
  ),

  state(
    'OPENED',
    style({
      height: '*',
      opacity: '1',
    })
  ),

  state('CLOSED', style({ height: '0px', opacity: '0' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);

export const sidenavPaddingAnimation = trigger('sidenavPaddingAnimation', [
  state(
    '*',
    style({
      padding: '8px',
    })
  ),

  state('OPENED', style({ padding: '16px' })),
  state('CLOSED', style({ padding: '8px' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);
