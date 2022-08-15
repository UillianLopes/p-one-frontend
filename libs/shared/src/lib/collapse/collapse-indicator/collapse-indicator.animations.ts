import { animate, state, style, transition, trigger } from '@angular/animations';

export const collapseIndicatorAnimation = trigger(
  'collapseIndicatorAnimation',
  [
    state('CLOSED', style({ transform: 'rotateZ(0deg)' })),
    state('OPENED', style({ transform: 'rotateZ(180deg)' })),

    transition('CLOSED => OPENED', animate('200ms ease-out')),
    transition('OPENED => CLOSED', animate('200ms ease-out')),
  ]
);
