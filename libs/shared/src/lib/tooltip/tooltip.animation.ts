import { animate, state, style, transition, trigger } from '@angular/animations';

export const tooltipAnimation = trigger('tooltipAnimation', [
  state('OPENED', style({ opacity: 1 })),
  state('CLOSED', style({ opacity: 0 })),

  transition('* => OPENED', animate('100ms ease-in')),
  transition('OPENED => CLOSED', animate('100ms ease-out')),
]);
