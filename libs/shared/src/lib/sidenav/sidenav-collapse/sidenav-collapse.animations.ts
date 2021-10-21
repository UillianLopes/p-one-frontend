import { animate, state, style, transition, trigger } from '@angular/animations';

export const sidenavColllapseAnimation = trigger('sidenavColllapseAnimation', [
  state('OPENED', style({ height: '*' })),
  state('CLOSED', style({ height: '0px' })),

  transition('OPENED => CLOSED', animate('.2s linear')),
  transition('CLOSED => OPENED', animate('.2s linear')),
]);

export const sidenavColllapseIconAnimation = trigger(
  'sidenavColllapseIconAnimation',
  [
    state('OPENED', style({ transform: 'rotateZ(90deg)' })),
    state('CLOSED', style({ transform: 'rotateZ(0deg)' })),

    transition('OPENED => CLOSED', animate('.2s linear')),
    transition('CLOSED => OPENED', animate('.2s linear')),
  ]
);
