import { animate, state, style, transition, trigger } from '@angular/animations';

export const dialogAnimations = trigger('dialogAnimations', [

  state('OPENED', style({ transform: `translateY(0%)`, opacity: 1 })),
  state('CLOSED', style({ transform: `translateY(-50%)`, opacity: 0 })),

  transition('* => CLOSED', animate('200ms linear')),
  transition('* => OPENED', animate('200ms linear')),
]);
